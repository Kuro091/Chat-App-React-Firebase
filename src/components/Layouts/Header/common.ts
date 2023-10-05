import { Icons } from '@/components/icons/Icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const isActiveRoute = (currentRouteHref: string, providedRouteHref: string) =>
  currentRouteHref.startsWith(providedRouteHref);
