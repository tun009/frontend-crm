import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'skeleton';
  text?: string;
  overlay?: boolean;
}

const Spinner = ({ size }: { size: string }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <svg 
      className={clsx('animate-spin text-slate-600', sizeClasses[size as keyof typeof sizeClasses])} 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
};

const Dots = ({ size }: { size: string }) => {
  const dotSizes = {
    small: 'h-1 w-1',
    medium: 'h-2 w-2',
    large: 'h-3 w-3'
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={clsx(
            'bg-slate-600 rounded-full animate-pulse',
            dotSizes[size as keyof typeof dotSizes]
          )}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

const Loading = ({
  size = 'medium',
  variant = 'spinner',
  text,
  overlay = false,
  className,
  ...props
}: LoadingProps) => {
  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return <Dots size={size} />;
      case 'skeleton':
        return <Skeleton />;
      default:
        return <Spinner size={size} />;
    }
  };

  const content = (
    <div className={clsx('flex flex-col items-center justify-center', className)} {...props}>
      {renderLoading()}
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default Loading;
