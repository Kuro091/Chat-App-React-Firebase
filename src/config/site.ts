import { NavItem } from "@/components/layouts/Header/common";

export const siteConfig = {
  name: "Chat App With Firebase",
  getNavLinks: (isLoggedIn: boolean) => {
    const common: NavItem[] = [
      {
        title: "Home",
        href: "/",
      },
    ];

    if (isLoggedIn) {
      return [
        ...common,
        {
          title: "Chats",
          href: "/chats",
        },
      ];
    }

    return [
      ...common,
      {
        title: "Login",
        href: "/login",
      },
    ];
  },
};
