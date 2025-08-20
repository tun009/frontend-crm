import { Button as AntButton, Card as AntCard, Input as AntInput, Table as AntTable } from 'antd';
import { ButtonProps, CardProps, InputProps, TableProps } from 'antd';
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
        'bg-white dark:bg-gray-800',
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
        'border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400',
        className
      )}
      {...props}
    />
  );
};

// Custom Table with dark mode support
export const Table = <T extends Record<string, any> = any>({ className, ...props }: TableProps<T> & { className?: string }) => {
  return (
    <AntTable<T>
      className={clsx(
        '[&_.ant-table]:bg-white [&_.ant-table]:dark:bg-gray-800',
        '[&_.ant-table-thead_.ant-table-cell]:bg-gray-50 [&_.ant-table-thead_.ant-table-cell]:dark:bg-gray-700',
        '[&_.ant-table-thead_.ant-table-cell]:border-gray-200 [&_.ant-table-thead_.ant-table-cell]:dark:border-gray-600',
        '[&_.ant-table-tbody_.ant-table-cell]:border-gray-200 [&_.ant-table-tbody_.ant-table-cell]:dark:border-gray-600',
        '[&_.ant-table-tbody_.ant-table-row]:bg-white [&_.ant-table-tbody_.ant-table-row]:dark:bg-gray-800',
        '[&_.ant-table-tbody_.ant-table-row:hover]:bg-gray-50 [&_.ant-table-tbody_.ant-table-row:hover]:dark:bg-gray-700',
        '[&_.ant-table-cell]:text-gray-900 [&_.ant-table-cell]:dark:text-gray-100',
        '[&_.ant-pagination]:text-gray-900 [&_.ant-pagination]:dark:text-gray-100',
        '[&_.ant-pagination_.ant-pagination-item]:bg-white [&_.ant-pagination_.ant-pagination-item]:dark:bg-gray-800',
        '[&_.ant-pagination_.ant-pagination-item]:border-gray-200 [&_.ant-pagination_.ant-pagination-item]:dark:border-gray-600',
        className
      )}
      {...props}
    />
  );
};
