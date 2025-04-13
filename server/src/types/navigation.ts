export type PageType = 'home' | 'about' | 'services' | 'projects' | 'blog' | 'contact';

export interface NavItem {
  id: PageType;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];
