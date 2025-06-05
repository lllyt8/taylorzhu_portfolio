// client/src/types/navigation.ts
export type PageType =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "blog"
  | "contact"
  | "creative-corner"
  | "admin";

export interface NavItem {
  id: PageType;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "creative-corner", label: "Creative Corner" },
  { id: "contact", label: "Contact" },
  // Admin 页面已从导航中移除，只能通过直接输入 URL 访问
];
