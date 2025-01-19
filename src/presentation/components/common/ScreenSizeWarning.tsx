import { useNavigate } from 'react-router-dom';

const ScreenSizeWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="rounded-lg p-6 max-w-md text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-xl">
        <h2 className="text-xl font-bold mb-3">Screen Size Warning</h2>
        <p className="mb-4">
          Please use a larger screen size for the best editing experience. 
        
        </p>
       
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 rounded-md bg-theme hover:bg-theme text-white transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ScreenSizeWarning;
