import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { useStreakData } from '@/hooks/useStreakData';
import { cn } from '@/lib/utils';

interface FireStreakProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FireStreak: React.FC<FireStreakProps> = ({ 
  className,
  showText = true,
  size = 'md'
}) => {
  const { currentStreak, streakStatus, message, isLoading, error } = useStreakData();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Add pulsing animation for high active streaks
  useEffect(() => {
    if (currentStreak >= 7 && streakStatus === 'active') {
      const interval = setInterval(() => {
        setIsAnimating(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentStreak, streakStatus]);

  // Don't render if loading or error
  if (isLoading || error) {
    return null;
  }

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      text: 'text-xs'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      text: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      text: 'text-base'
    }
  };

  const sizes = sizeClasses[size];

  // Determine colors based on streak status
  const isActive = streakStatus === 'active';
  
  const containerColors = isActive 
    ? 'bg-orange-500/10 dark:bg-purple-500/10 hover:bg-orange-500/20 dark:hover:bg-purple-500/20 border-orange-500/20 dark:border-purple-500/20 text-orange-600 dark:text-purple-500'
    : 'bg-gray-400/10 dark:bg-gray-500/10 hover:bg-gray-400/20 dark:hover:bg-gray-500/20 border-gray-400/20 dark:border-gray-500/20 text-gray-600 dark:text-gray-400';
    
  const iconColors = isActive 
    ? 'text-orange-500 dark:text-purple-500'
    : 'text-gray-500 dark:text-gray-400';
    
  const textColors = isActive 
    ? 'text-orange-600 dark:text-purple-500'
    : 'text-gray-600 dark:text-gray-400';

  return (
    <div 
      title={message} // Show hover message
      className={cn(
        'flex items-center gap-1.5 rounded-full transition-all duration-300 cursor-pointer border',
        containerColors,
        isActive && 'hover:scale-105 hover:shadow-lg',
        isActive && isAnimating && 'animate-pulse',
        sizes.container,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flame className={cn(
        'transition-all duration-300',
        iconColors,
        isActive && isHovered && 'animate-bounce',
        isActive && isAnimating && 'animate-ping',
        sizes.icon
      )} />
      {showText && (
        <span className={cn(
          'font-medium transition-all duration-300',
          textColors,
          isActive && isHovered && 'font-bold',
          sizes.text
        )}>
          {currentStreak}
        </span>
      )}
    </div>
  );
};

export default FireStreak;
