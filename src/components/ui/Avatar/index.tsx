import { ImgHTMLAttributes, useState } from 'react';
import { clsx } from 'clsx';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  name?: string;
  src?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

const Avatar = ({
  size = 'medium',
  shape = 'circle',
  name,
  src,
  icon,
  backgroundColor,
  textColor = 'white',
  className,
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    small: 'h-8 w-8 text-xs',
    medium: 'h-10 w-10 text-sm',
    large: 'h-12 w-12 text-base',
    xlarge: 'h-16 w-16 text-lg'
  };
  
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name: string) => {
    if (backgroundColor) return backgroundColor;
    
    const colors = [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-slate-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const baseClasses = clsx(
    'inline-flex items-center justify-center font-medium overflow-hidden',
    sizeClasses[size],
    shapeClasses[shape],
    className
  );

  if (src && !imageError) {
    return (
      <img
        src={src}
        className={baseClasses}
        onError={() => setImageError(true)}
        {...props}
      />
    );
  }

  if (icon) {
    return (
      <div 
        className={clsx(baseClasses, 'bg-gray-200 text-gray-600')}
        style={{ backgroundColor, color: textColor }}
      >
        {icon}
      </div>
    );
  }

  if (name) {
    return (
      <div 
        className={clsx(baseClasses, getBackgroundColor(name))}
        style={{ backgroundColor, color: textColor }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={clsx(baseClasses, 'bg-gray-200 text-gray-600')}>
      <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  );
};

export default Avatar;
