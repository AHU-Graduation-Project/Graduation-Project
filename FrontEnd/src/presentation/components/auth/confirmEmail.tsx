// components/auth/ConfirmEmail.tsx
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useConfirmEmailStore } from "../../store/useConfirmEmailStore";

const ConfirmEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { status, error, confirmEmail } = useConfirmEmailStore();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("confirmToken", token);
      navigate("/auth/confirm-email", { replace: true });
    } else {
      const storedToken = localStorage.getItem("confirmToken");
      if (storedToken) {
        confirmEmail(storedToken);
      } else {
        useConfirmEmailStore.setState({
          status: "error",
          error: "No confirmation token found",
        });
      }
    }
  }, [searchParams, navigate, confirmEmail]);

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
