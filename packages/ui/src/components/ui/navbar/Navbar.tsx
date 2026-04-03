"use client";
import React from 'react';
import { MenuHamburger, Search, Sun, Moon, ChevronDown, User, Settings, Lock } from 'apen-icons';
import { cn } from '../../../lib/utils';

// UI Components
import { Button } from '../button/Button';
import { Divider } from '../divider/Divider';
import { InputGroup } from '../input-group/InputGroup';
import { Body, BodySmall, Label, Overline } from '../typography/Typography';
import { Logo } from '../logo/Logo';

// New Dropdown System
import { Dropdown } from '../dropdown/Dropdown';
import { DropdownTrigger } from '../dropdown/DropdownTrigger';
import { DropdownContent } from '../dropdown/DropdownContent';
import { DropdownItem } from '../dropdown/DropdownItem';

interface NavbarProps {
  onToggleSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  userName?: string;
  userRole?: string;
}

export const Navbar = ({ 
  onToggleSidebar, 
  isDark, 
  onToggleTheme,
  userName = "Ibrar", 
  userRole = "Software Developer" 
}: NavbarProps) => {
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className={cn(
      "h-16 sticky top-0 z-50 px-4 flex items-center justify-between transition-all duration-300",
      "bg-white/80 border-b border-neutral-100 backdrop-blur-md",
      "dark:bg-surface-950/80 dark:border-surface-800 dark:backdrop-blur-md"
    )}>
      
      {/* Left: Sidebar Toggle & Logo */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="text-secondary dark:text-neutral-400"
        >
          <MenuHamburger size={20} />
        </Button>

        <Logo 
          brandName="Apen" 
          brandSuffix="UI" 
          iconSrc="/logo.svg" 
          iconDarkSrc="/logo-dark.svg" 
        />
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md px-8 hidden md:block">
        <InputGroup
          placeholder="Search documentation..."
          startAddon={<Search size={16} />}
          className="bg-neutral-50 dark:bg-surface-900 border-none focus-within:ring-1 focus-within:ring-primary/20"
        />
      </div>

      {/* Right: Actions & Profile Dropdown */}
      <div className="flex items-center gap-1">
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleTheme}
        >
          {isDark ? (
            <Sun size={18} className="animate-in zoom-in spin-in-90 duration-300" />
          ) : (
            <Moon size={18} className="animate-in zoom-in spin-in-90 duration-300" />
          )}
        </Button>

        <Divider orientation="vertical" className="mx-2 h-6" />

        <Dropdown>
          <DropdownTrigger>
            <Button variant="ghost" className="p-1 pr-2 gap-3 h-10 group">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold bg-neutral-100 text-primary border border-neutral-200 dark:bg-surface-800 dark:text-white dark:border-surface-700">
                {userInitial}
              </div>
              
              {/* User Info */}
              <div className="flex flex-col text-left hidden sm:flex">
                <Label className="text-[12px] font-bold leading-tight">
                  {userName}
                </Label>
                <BodySmall className="text-[10px] font-medium text-secondary dark:text-neutral-500 uppercase tracking-wider">
                  {userRole}
                </BodySmall>
              </div>
              
              {/* Animated Chevron */}
              <ChevronDown 
                size={14} 
                className="text-neutral-400 transition-transform duration-200 group-data-[state=open]:rotate-180" 
              />
            </Button>
          </DropdownTrigger>

          <DropdownContent align="right" className="w-56">
            
            <div className="px-3 pb-2">
              <Overline>Account</Overline>
            </div>
            
            <Divider className="my-1" />

            <DropdownItem icon={<User size={16} />} onClick={() => console.log("Profile")}>
              My Profile
            </DropdownItem>
            
            <DropdownItem icon={<Settings size={16} />} onClick={() => console.log("Settings")}>
              Settings
            </DropdownItem>
            
            <Divider className="my-1" />
            
            <DropdownItem 
              icon={<Lock size={16} />} 
              danger 
              onClick={() => console.log("Logout")}
            >
              Log out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
};