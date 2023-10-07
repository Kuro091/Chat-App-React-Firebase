import { Disclosure } from '@headlessui/react';
import useResizeObserver from '@react-hook/resize-observer';
import { Menu, X } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { UserProfile } from '@/components/common/UserProfile';
import { Icons } from '@/components/icons/Icons';
import { siteConfig } from '@/config/site';
import { LogoutButton } from '@/features/auth';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { cn } from '@/lib/tailwind-classname';
import { useSiteStore } from '@/store/site';

import { NavItem, isActiveRoute } from './common';

const Hamburger = ({ open }: { open: boolean }) => {
  return (
    <Disclosure.Button
      aria-label="Toggle Menu"
      className="px-2 py-1 ml-auto text-primary-foreground rounded-md lg:hidden hover:text-indigo-100 focus:text-indigo-800 focus:bg-indigo-50 focus:outline-none "
    >
      {open ? <X /> : <Menu size={24} />}
    </Disclosure.Button>
  );
};

export const Header = () => {
  const { currentUser } = useUsers();
  const isLoggedIn = !!currentUser;

  const headerRef = useRef<HTMLDivElement>(null);
  const { setHeaderSize } = useSiteStore();

  useResizeObserver(headerRef, (entry) => {
    setHeaderSize(entry.target.clientHeight);
  });

  return (
    <nav
      ref={headerRef}
      className="w-full relative flex flex-wrap items-center justify-between px-8 py-6 mx-auto lg:justify-between bg-primary"
    >
      {/* Mobile Nav  */}
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold text-primary-foreground dark:text-gray-100 hover:text-indigo-100 focus:text-indigo-200 "
              >
                <Icons.logo width={30} height={30} />
                <span className="inline-block text-lg">{siteConfig.name}</span>
              </Link>

              <Hamburger open={open} />

              <Disclosure.Panel className="flex flex-col w-full my-5 lg:hidden">
                <>
                  <NavMenu navigation={siteConfig.getNavLinks(isLoggedIn)} mobile={true} />
                  {isLoggedIn && <LogoutButton />}
                </>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
      {currentUser?.uid && (
        <UserProfile
          className="w-full lg:w-fit mt-5 lg:mt-0"
          inverted
          displayName={currentUser?.displayName || ''}
          online={currentUser?.online || false}
          photoURL={currentUser?.photoURL || ''}
        />
      )}
      {/* Desktop Nav  */}
      <div className="hidden text-center lg:flex lg:items-center">
        <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex gap-x-3">
          <NavMenu navigation={siteConfig.getNavLinks(isLoggedIn)} />
          {isLoggedIn && <LogoutButton />}
        </ul>
      </div>
    </nav>
  );
};

const NavMenu = ({ navigation, mobile = false }: { navigation: NavItem[]; mobile?: boolean }) => {
  const path = useCurrentPath();

  return (
    <>
      {navigation.map((item, index) => {
        const isActive = isActiveRoute(item.href as string, path);

        return (
          <div key={index}>
            <MenuItem item={item} mobile={mobile} active={isActive} />
          </div>
        );
      })}
    </>
  );
};

const MenuItem = ({
  item,
  mobile,
  active = false,
}: {
  item: NavItem;
  mobile: boolean;
  active?: boolean;
}) => {
  return (
    <Link
      to={item?.href ? item.href : '#'}
      className={cn(
        'text-primary-foreground font-bold text-lg rounded-md outline-none hover:text-indigo-200 focus:text-indigo-100  transition-all focus:outline-none',
        mobile ? 'w-full block px-4 py-2 -ml-4' : 'inline-block px-4 py-2',
        active ? 'bg-indigo-500' : ''
      )}
    >
      {item.title}
    </Link>
  );
};
