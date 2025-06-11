// Custom hook for mobile sheet animation logic
import { useState, useEffect } from "react";

interface UseMobileSheetAnimationProps {
  fieldmapId: string | undefined;
}

export const useMobileSheetAnimation = ({ fieldmapId }: UseMobileSheetAnimationProps) => {
  const [isOffScreen, setIsOffScreen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Handle entry/exit animations based on whether we have a selected feature
  useEffect(() => {
    if (fieldmapId !== undefined) {
      setIsOffScreen(false); // Slide up from bottom
    } else {
      setIsOffScreen(true); // Hide completely
    }
  }, [fieldmapId]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOffScreen,
    isOpen,
    setIsOffScreen,
    toggleOpen
  };
};