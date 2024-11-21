import { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../utils/cn';

interface ThemeIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  icon: LucideIcon;
}

const ThemeIcon = forwardRef<SVGSVGElement, ThemeIconProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    const { currentTheme } = useThemeStore();
    
    return (
      <Icon
        ref={ref}
        className={cn(currentTheme.iconColor, className)}
        {...props}
      />
    );
  }
);

ThemeIcon.displayName = 'ThemeIcon';

export default ThemeIcon;