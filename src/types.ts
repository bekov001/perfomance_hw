export interface EventProps {
  icon: string;
  iconLabel: string;
  title: string;
  subtitle?: string;
  slim?: boolean;
  onSize?: (size: { width: number; height: number }) => void;
}

export interface TabData {
  title: string;
  items: Array<{
    icon: string;
    iconLabel: string;
    title: string;
    subtitle: string;
  }>;
}

export interface TabsData {
  [key: string]: TabData;
}

export interface Size {
  width: number;
  height: number;
} 