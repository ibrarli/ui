"use client";
import React from 'react';
import { User2, Settings, Lock, Bug } from 'apen-icons';
import { cn } from '../lib/utils';

interface ProfileDropdownProps {
  isOpen: boolean;
  userName: string;
  userRole: string;
}

export const ProfileDropdown = ({ isOpen, userName, userRole }: ProfileDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className={cn(
      "absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200",
      // Light Mode
      "bg-white border-neutral-100",
      // Dark Mode - Using !important-style logic to override any defaults
      "dark:!bg-surface-900 dark:border-surface-800"
    )}>
      {/* User Info Header */}
      <div className="p-4 border-b border-neutral-50 dark:border-surface-800 bg-neutral-50/50 dark:!bg-surface-950/50">
        <p className="text-xs font-bold text-primary dark:text-white truncate">{userName}</p>
        <p className="text-[10px] text-secondary dark:text-neutral-500 uppercase tracking-wider mt-0.5 font-medium">
          {userRole}
        </p>
      </div>

      {/* Menu Items Area */}
      <div className="p-1.5 dark:!bg-surface-900"> 
        <DropdownItem icon={<User2 size={16} />} label="My Profile" />
        <DropdownItem icon={<Bug size={16} />} label="Security" />
        <DropdownItem icon={<Settings size={16} />} label="Account Settings" />
        
        <div className="h-px bg-neutral-50 dark:bg-surface-800 my-1.5 mx-2" />
        
        <DropdownItem 
          icon={<Lock size={16} />} 
          label="Sign Out" 
          variant="danger" 
        />
      </div>
    </div>
  );
};

const DropdownItem = ({ icon, label, variant = 'default' }: { icon: React.ReactNode, label: string, variant?: 'default' | 'danger' }) => (
  <button className={cn(
    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all cursor-pointer group",
    variant === 'danger' 
      ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10' 
      : 'text-secondary hover:bg-neutral-50 dark:hover:bg-surface-800 hover:text-primary dark:text-neutral-300 dark:hover:text-white'
  )}>
    <div className={cn(
      "shrink-0 transition-colors",
      variant === 'default' && "text-neutral-400 group-hover:text-primary dark:text-neutral-500 dark:group-hover:text-white"
    )}>
      {icon}
    </div>
    <span className="font-medium">{label}</span>
  </button>
);