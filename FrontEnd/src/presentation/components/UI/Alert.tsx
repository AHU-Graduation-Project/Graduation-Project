import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', icon, children, ...props }, ref) => {
    const baseStyles = 'relative w-full rounded-lg border p-4';

    const variantStyles = {
      default:
        'bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
      destructive:
        'bg-white border-red-500/50 text-red-600 dark:bg-gray-800 dark:border-red-500/50 dark:text-red-400',
      success:
        'bg-white border-green-500/50 text-green-600 dark:bg-gray-800 dark:border-green-500/50 dark:text-green-400',
      warning:
        'bg-white border-yellow-500/50 text-yellow-600 dark:bg-gray-800 dark:border-yellow-500/50 dark:text-yellow-400',
      info: 'bg-white border-blue-500/50 text-blue-600 dark:bg-gray-800 dark:border-blue-500/50 dark:text-blue-400',
    };

    const iconStyles = icon ? 'pl-11' : '';

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseStyles} ${variantStyles[variant]} ${iconStyles} ${className}`}
        {...props}
      >
        {icon && <div className="absolute left-4 top-4 text-lg">{icon}</div>}
        {children}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`text-sm leading-6 ${className}`} {...props} />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription };
