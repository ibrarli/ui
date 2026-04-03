"use client";
import { TriangleAlert, X } from "apen-icons";
import { useEffect } from "react";
import { cn } from "../../../lib/utils";

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToastProps {
  id: string;
  message: string;
  index: number; 
  total: number; 
  position: ToastPosition;
  onClose: (id: string) => void;
}

export const Toast = ({ id, message, index, total, position, onClose }: ToastProps) => {
  // Logic: First error in array (index 0) is at the front
  const reverseIndex = total - 1 - index;

  useEffect(() => {
    const baseTime = 5000; // Increased to 5s so users can actually read it
    const timer = setTimeout(() => {
      onClose(id);
    }, baseTime + (index * 200));
    return () => clearTimeout(timer);
  }, [id, onClose, index]);

  // Limit visual stack to top 3
  if (reverseIndex > 2) return null;

  const isBottom = position.includes('bottom');
  const isCenter = position.includes('center');

  const scale = 1 - reverseIndex * 0.04;
  const opacity = 1 - reverseIndex * 0.3;
  const yTranslate = reverseIndex * (isBottom ? -12 : 12);

  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-center': 'top-6 left-0 md:left-1/2',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-0 md:left-1/2',
    'bottom-right': 'bottom-6 right-6',
  };

  return (
    <div 
      className={cn(
        "fixed z-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "animate-in fade-in px-4 md:px-0 w-full md:w-auto",
        "pointer-events-auto", // FIXED: Allows clicking the close button
        isBottom ? "slide-in-from-bottom-10" : "slide-in-from-top-10",
        positionClasses[position]
      )}
      style={{ 
        zIndex: 100 - reverseIndex,
        opacity: opacity,
        transform: `
          ${isCenter ? 'translateX(var(--mx-translate-x, 0%))' : 'translateX(0)'} 
          translateY(${yTranslate}px) 
          scale(${scale})
        `,
        // @ts-ignore
        '--mx-translate-x': typeof window !== 'undefined' && window.innerWidth < 768 ? '0%' : '-50%',
        filter: reverseIndex > 0 ? 'blur(0.5px)' : 'none'
      } as React.CSSProperties}
    >
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl  dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-2xl min-w-full md:min-w-85 max-w-100",
        isCenter ? "mx-auto" : ""
      )}>
        <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
          <TriangleAlert size={18} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-0.5">
            Security Alert
          </p>
          <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
            {message}
          </p>
        </div>
        
        {/* FIXED: Removed reverseIndex === 0 check so all visible toasts are closable */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose(id);
          }} 
          className="cursor-pointer p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ml-2"
        >
          <X size={14} /> 
        </button>
      </div>
    </div>
  );
};