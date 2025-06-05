// Landing page related types and constants

export interface StatCardData {
  value: string;
  label: string;
  ariaLabel?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  profileImage: string;
}

// Personal information configuration
export const PERSONAL_INFO: PersonalInfo = {
  name: "Taylor Zhu",
  title: "Software Engineer Intern @ EPC Energy",
  description:
    "Software | Data | AI | Currently Building Data-driven Solutions for Sustainable Energy",
  profileImage: "/profile_pic.jpg",
} as const;

// Statistics data configuration
export const STATS_DATA: StatCardData[] = [
  {
    value: "3+",
    label: "Professional Experience",
    ariaLabel: "3 plus years of professional experience",
  },
  {
    value: "5+",
    label: "Major Projects",
    ariaLabel: "5 plus major projects completed",
  },
] as const;

// Animation configurations
export const LANDING_PAGE_ANIMATIONS = {
  pageVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
} as const;
