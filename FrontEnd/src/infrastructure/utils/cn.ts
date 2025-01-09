import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemeColor() {
  const root = document.documentElement;
  const from = getComputedStyle(root).getPropertyValue('--theme-from');
  const to = getComputedStyle(root).getPropertyValue('--theme-to');
  return { from, to };
}