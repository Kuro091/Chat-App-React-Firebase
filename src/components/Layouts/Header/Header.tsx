import { Disclosure } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Icons } from "@/components/icons/Icons";
import { siteConfig } from "@/config/site";
import { LogoutButton } from "@/features/auth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/tailwind-classname";

import { NavItem } from "./common";

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
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <nav className="w-full relative flex flex-wrap items-center justify-between px-8 py-6 mx-auto lg:justify-between bg-primary">
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
                  <NavMenu
                    navigation={siteConfig.getNavLinks(isLoggedIn)}
                    mobile={true}
                  />
                </>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
      {isLoggedIn && <span>Hello {user.displayName}</span>}
      {/* Desktop Nav  */}
      <div className="hidden text-center lg:flex lg:items-center">
        <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex">
          <NavMenu navigation={siteConfig.getNavLinks(isLoggedIn)} />
          {isLoggedIn && <LogoutButton />}
        </ul>
      </div>
    </nav>
  );
};

const NavMenu = ({
  navigation,
  mobile = false,
}: {
  navigation: NavItem[];
  mobile?: boolean;
}) => {
  return (
    <>
      {navigation.map((item, index) => {
        return (
          <div key={index}>
            <MenuItem item={item} mobile={mobile} />
          </div>
        );
      })}
    </>
  );
};

const MenuItem = ({ item, mobile }: { item: NavItem; mobile: boolean }) => {
  return (
    <Link
      to={item?.href ? item.href : "#"}
      className={cn(
        "text-primary-foreground font-bold text-lg rounded-md outline-none hover:text-indigo-200 focus:text-indigo-100  transition-all focus:outline-none",
        mobile ? "w-full block px-4 py-2 -ml-4" : "inline-block px-4 py-2",
      )}
    >
      {item.title}
    </Link>
  );
};
