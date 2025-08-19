import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  children?: ReactNode;
}

const Badge = ({
  variant = 'default',
  size = 'medium',
  dot = false,
  count,
  showZero = false,
  children,
  className,
  ...props
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-sm',
    large: 'px-3 py-1 text-sm'
  };

  const dotClasses = {
    small: 'h-2 w-2',
    medium: 'h-2.5 w-2.5',
    large: 'h-3 w-3'
  };

  if (dot) {
    return (
      <span className="relative inline-block">
        {children}
        <span 
          className={clsx(
            'absolute -top-1 -right-1 rounded-full',
            dotClasses[size],
            variantClasses[variant].split(' ')[0],
            className
          )}
          {...props}
        />
      </span>
    );
  }

  if (count !== undefined) {
    const displayCount = count > 99 ? '99+' : count.toString();
    const shouldShow = count > 0 || (count === 0 && showZero);
    
    if (!shouldShow) {
      return <>{children}</>;
    }

    if (children) {
      return (
        <span className="relative inline-block">
          {children}
          <span 
            className={clsx(
              'absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center text-xs font-medium text-white bg-red-500 rounded-full px-1',
              className
            )}
            {...props}
          >
            {displayCount}
          </span>
        </span>
      );
    }
  }

  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {count !== undefined ? (count > 99 ? '99+' : count) : children}
    </span>
  );
};

export default Badge;
