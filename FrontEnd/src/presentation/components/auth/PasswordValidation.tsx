import React, { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

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
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>-_]/.test(pass),
    };

    setValidations(checks);
    onValidationChange(Object.values(checks).every(Boolean));
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const renderCheck = (isValid) => {
    return isValid ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="space-y-1 text-xs">
      <div className="flex items-center gap-2">
        {renderCheck(validations.length)}
        <span
          className={validations.length ? "text-green-500" : "text-red-500"}
        >
          At least 8 characters
        </span>
      </div>
      <div className="flex items-center gap-2">
        {renderCheck(validations.uppercase)}
        <span
          className={validations.uppercase ? "text-green-500" : "text-red-500"}
        >
          At least one uppercase letter
        </span>
      </div>
      <div className="flex items-center gap-2">
        {renderCheck(validations.lowercase)}
        <span
          className={validations.lowercase ? "text-green-500" : "text-red-500"}
        >
          At least one lowercase letter
        </span>
      </div>
      <div className="flex items-center gap-2">
        {renderCheck(validations.number)}
        <span
          className={validations.number ? "text-green-500" : "text-red-500"}
        >
          At least one number
        </span>
      </div>
      <div className="flex items-center gap-2">
        {renderCheck(validations.special)}
        <span
          className={validations.special ? "text-green-500" : "text-red-500"}
        >
          At least one special character
        </span>
      </div>
    </div>
  );
};

export default PasswordValidation;
