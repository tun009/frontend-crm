import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">403</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Forbidden
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You don't have permission to access this resource.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="primary" size="large" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full text-blue-600 hover:text-blue-500 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
