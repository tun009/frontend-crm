import { Button as AntButton, Card as AntCard, Input as AntInput } from 'antd';
import { ButtonProps, CardProps, InputProps } from 'antd';
import { clsx } from 'clsx';

// Custom Button with additional styling
export const Button = ({ className, ...props }: ButtonProps & { className?: string }) => {
  return (
    <AntButton
      className={clsx(
        'shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    />
  );
};

// Custom Card with consistent styling
export const Card = ({ className, ...props }: CardProps & { className?: string }) => {
  return (
    <AntCard
      className={clsx(
        'shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  );
};

// Custom Input with consistent styling
export const Input = ({ className, ...props }: InputProps & { className?: string }) => {
  return (
    <AntInput
      className={clsx(
        'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400',
        className
      )}
      {...props}
    />
  );
};
