import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const Card = ({
  title,
  subtitle,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  children,
  className,
  ...props
}: CardProps) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  
  const borderClasses = bordered ? 'border border-gray-200' : 'shadow-sm';
  
  const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';

  if (loading) {
    return (
      <div className={clsx(baseClasses, borderClasses, 'p-6', className)} {...props}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        baseClasses,
        borderClasses,
        hoverClasses,
        className
      )}
      {...props}
    >
      {(title || subtitle || extra) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {extra && (
              <div className="flex-shrink-0">{extra}</div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
