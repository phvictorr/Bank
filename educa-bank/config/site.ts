export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Educa Bank",
  description: "Educa Bank App",
  navItems: [
    {
      label: "Login",
      href: "/",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Pix",
      href: "/pix",
    },
    {
      label: "Boletos",
      href: "/boletos",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
