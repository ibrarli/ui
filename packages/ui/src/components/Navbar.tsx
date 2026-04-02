"use client";
import { useState, useRef, useEffect } from 'react';
import { HamburgerMenu, Search, ArrowDown, Sun, Moon } from 'apen-icons';
import { cn } from '../lib/utils';
import { ProfileDropdown } from './ProfileDropdown';

interface NavbarProps {
  onToggleSidebar: () => void;
  // New Theme Props
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userInitial = userName.charAt(0).toUpperCase();

  // Close dropdown logic...
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={cn(
      "h-16 sticky top-0 z-50 px-4 flex items-center justify-between transition-all duration-300",
      "bg-white/80 border-b border-neutral-100 backdrop-blur-md",
      "dark:bg-surface-950/80 dark:border-surface-800 dark:backdrop-blur-md"
    )}>
      
      {/* Left: Toggle & Branding (Same as before) */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-neutral-100 dark:hover:bg-surface-800 rounded-xl text-secondary dark:text-neutral-400 transition-all active:scale-95">
          <HamburgerMenu size={20} />
        </button>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 shrink-0 group-hover:scale-105 transition-transform">
             <img src="/logo.svg" alt="Logo" className="w-full h-full block dark:hidden" />
             <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
          </div>
          <span className="font-bold text-primary dark:text-white tracking-tight hidden sm:block">
            Apen<span className="text-secondary dark:text-neutral-500 font-medium">UI</span>
          </span>
        </div>
      </div>

      {/* Center: Search (Same as before) */}
      <div className="flex-1 max-w-md px-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white transition-colors" size={16} />
          <input type="text" placeholder="Search documentation..." className={cn(
            "w-full py-2 pl-10 pr-4 rounded-xl text-xs outline-none bg-neutral-50 border border-neutral-100 focus:bg-white focus:border-neutral-300",
            "dark:bg-surface-900 dark:border-surface-800 dark:text-neutral-200 dark:focus:border-neutral-600 dark:focus:bg-surface-950"
          )} />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-1 relative" ref={dropdownRef}>
        
        {/* Theme Toggle: Uses props passed from the app */}
        <button 
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-surface-800 transition-all active:scale-90"
        >
          {isDark ? (
            <Sun size={18} className="animate-in zoom-in spin-in-90 duration-300" />
          ) : (
            <Moon size={18} className="animate-in zoom-in spin-in-90 duration-300" />
          )}
        </button>

        <div className="h-6 w-px bg-neutral-100 dark:bg-surface-800 mx-1" />

        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            "flex items-center gap-3 p-1 pr-2 rounded-xl transition-all group text-left",
            isDropdownOpen ? "bg-neutral-50 dark:bg-surface-900" : "hover:bg-neutral-50 dark:hover:bg-surface-900"
          )}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold bg-neutral-100 text-primary border border-neutral-200 dark:bg-surface-800 dark:text-white dark:border-surface-700">
             {userInitial}
          </div>
          
          <div className="flex flex-col hidden sm:flex">
            <span className="text-[12px] font-bold text-primary dark:text-white leading-tight">{userName}</span>
            <span className="text-[10px] font-medium text-secondary dark:text-neutral-500 uppercase tracking-wider">{userRole}</span>
          </div>
          
          <ArrowDown size={14} className={cn("text-neutral-400 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
        </button>

        <ProfileDropdown 
          isOpen={isDropdownOpen} 
          userName={userName} 
          userRole={userRole} 
        />
      </div>
    </header>
  );
};