import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

const PasswordValidation = ({ password, onValidationChange }) => {
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const validatePassword = (pass) => {
    const checks = {
      lowercase: /[a-z]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[-!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]+/.test(pass),
      length: pass.length >= 8,
    };

    setValidations(checks);
    onValidationChange(Object.values(checks).every(Boolean));
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const getFirstFailedValidation = () => {
    const messages = {
      length: "At least 8 characters",
      uppercase: "At least one uppercase letter",
      lowercase: "At least one lowercase letter",
      number: "At least one number",
      special: "At least one special character",
    };

    const firstFailed = Object.entries(validations).find(([_, isValid]) => !isValid);
    return firstFailed ? { rule: firstFailed[0], message: messages[firstFailed[0]] } : null;
  };

  const failedValidation = getFirstFailedValidation();

  return (
    <div className="space-y-1 text-xs">
      {failedValidation && (
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="text-red-500">{failedValidation.message}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordValidation;
