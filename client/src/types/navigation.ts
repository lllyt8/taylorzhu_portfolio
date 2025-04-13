// client/src/types/navigation.ts
export type PageType =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "blog"
  | "contact"
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
  { id: "contact", label: "Contact" },
  { id: "admin", label: "Admin" }, // 添加管理员导航
];
