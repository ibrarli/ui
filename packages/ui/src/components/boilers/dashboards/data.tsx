import React from 'react';
import { 
  Home, 
  Square, 
  Bookmark, 
  Monitor, 
  Eye2, 
  Settings, 
  Lock, 
  CircleX 
} from 'apen-icons';
import type { SidebarSection, SidebarNavItem } from '../../ui/sidebar/Sidebar';

export const NAVIGATION_DATA: SidebarSection[] = [
  {
    group: "General",
    items: [
      { id: 'overview', label: "Overview", icon: <Home size={18} />, active: true },
      { id: 'layout', label: "Layouts", icon: <Square size={18} /> },
    ]
  },
  {
    group: "System",
    items: [
      { id: 'components', label: "Components", icon: <Bookmark size={18} /> },
      { id: 'cli', label: "CLI Tools", icon: <Monitor size={18} /> },
      { id: 'dev', label: "API Reference", icon: <Eye2 size={18} /> },
    ]
  }
];

export const FOOTER_DATA: SidebarNavItem[] = [
  { id: 'settings', label: "Settings", icon: <Settings size={18} /> },
  { id: 'support', label: "Support", icon: <CircleX size={18} /> },
  { 
    id: 'logout', 
    label: "Log out", 
    icon: <Lock size={18} />, 
    onClick: () => {
      console.log("Logout triggered");
      // Add auth cleanup logic here
    } 
  },
];