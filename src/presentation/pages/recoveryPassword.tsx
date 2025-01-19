import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackgroundRays from '../components/OverView/BackgroundRays';
import useTokenStore from '../../application/state/tokenStore';
import { passwordRecovery } from '../../infrastructure/api/passwordRecovery';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function RecoveryPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setRecoveryToken, recoveryToken } = useTokenStore();

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery && !recoveryToken) {
      setRecoveryToken(tokenFromQuery);
      navigate('/recovery-password', { replace: true });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryToken) {
      setError('Invalid recovery link');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await passwordRecovery({
        password,
        recoveryToken
      });
      if (response.success) {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password recovery failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundRays option={2} fullPage={true} />
      {isLoading ? (
        <LoadingOverlay text="Updating Password..." />
      ) : (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
          {error ? (
            <div className="space-y-4">
              <h2 className="text-red-500 text-xl">Recovery Failed</h2>
              <p className="text-white">{error}</p>
            </div>
          ) : success ? (
            <div className="space-y-4">
              <h2 className="text-green-500 text-xl">Password Updated!</h2>
              <p className="text-white">Your password has been successfully updated.</p>
              <button
                onClick={() => navigate('/auth')}
                className="bg-primary hover:bg-primary/80 bg-theme bg-theme-shadow px-6 py-2 rounded-lg transition-colors"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-white text-2xl mb-6">Reset Password</h2>
              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 bg-theme bg-theme-shadow px-6 py-2 rounded-lg transition-colors text-white"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
