// components/auth/ConfirmEmail.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "../UI/Alert";
import { AlertDescription } from "../UI/Alert";
import useTokenStore from "../../../application/state/tokenStore";

const ConfirmEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { token, setToken } = useTokenStore();

  const confirmEmail = async (confirmationToken: string) => {
    if (!confirmationToken) {
      setError('Invalid confirmation token');
      setStatus('error');
      return;
    }

    try {
      setStatus('processing');
      // Add your API call here to confirm the email
      // const response = await api.confirmEmail(confirmationToken);
      setStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm email');
      setStatus('error');
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setToken(urlToken);
      confirmEmail(urlToken);
    } else if (token) {
      confirmEmail(token);
    } else {
      setError('No confirmation token found');
      setStatus('error');
    }
  }, [searchParams, token, setToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === "processing" && (
        <Alert className="w-full max-w-md">
          <AlertDescription>Confirming your email address...</AlertDescription>
        </Alert>
      )}

      {status === "success" && (
        <Alert className="w-full max-w-md bg-green-50">
          <AlertDescription>
            Email confirmed successfully! You can now close this window.
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && error && (
        <Alert className="w-full max-w-md bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ConfirmEmail;
