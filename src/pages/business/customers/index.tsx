import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('menu.customers')}
      </h1>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Customers page - Coming soon
        </p>
      </div>
    </div>
  );
};

export default Customers;
