import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// used for overriding tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
