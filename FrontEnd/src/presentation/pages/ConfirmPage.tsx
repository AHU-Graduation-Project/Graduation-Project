import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackgroundRays from '../components/OverView/BackgroundRays';
import useTokenStore from '../../application/state/tokenStore';
import confirmEmail from '../../infrastructure/api/conformEmail';

export default function ConfirmPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setConfirmToken, confirmToken } = useTokenStore();

  useEffect(() => {
    const handleConfirmation = async () => {
      const tokenFromQuery = searchParams.get('token');

      if (tokenFromQuery) {
        setConfirmToken(tokenFromQuery);
        navigate('/confirm-email', { replace: true });
        return;
      }

      if (confirmToken && !success) {
        setIsLoading(true);
        try {
          const response = await confirmEmail(confirmToken);
          if (response.success) {
            setSuccess(true);
            setError(null);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Confirmation failed');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleConfirmation();
  }, [searchParams, confirmToken]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundRays option={2} fullPage={true} />
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-white">Confirming your email...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <h2 className="text-red-500 text-xl">Confirmation Failed</h2>
            <p className="text-white">{error}</p>
          </div>
        ) : success ? (
          <div className="space-y-4">
            <h2 className="text-green-500 text-xl">Email Confirmed!</h2>
            <p className="text-white">Your email has been successfully confirmed.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        ) : (
          <p className="text-white">Initializing confirmation process...</p>
        )}
      </div>
    </div>
  );
}
