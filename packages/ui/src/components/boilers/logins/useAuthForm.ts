"use client";
import { useState, useCallback } from "react";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [toasts, setToasts] = useState<{ id: string; msg: string }[]>([]);

  const addToast = useCallback((msg: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "email" || name === "username") finalValue = value.toLowerCase();
    if (name === "password") finalValue = value.replace(/\s/g, "");

    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    const empty = { fullname: "", username: "", email: "", password: "" };
    setFormData(empty);
    setFieldErrors(empty);
    setToasts([]);
  };

  const validate = () => {
    const newErrors = { fullname: "", username: "", email: "", password: "" };
    let hasError = false;

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Invalid email format.";
      hasError = true;
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      hasError = true;
    }
    
    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Username is required.";
        hasError = true;
      } else if (!/^[a-z0-9._]+$/.test(formData.username)) {
        newErrors.username = "Lowercase, numbers, dots, or underscores only.";
        hasError = true;
      }
      if (!formData.fullname) {
        newErrors.fullname = "Full name is required.";
        hasError = true;
      }
    }

    setFieldErrors(newErrors);
    
    if (hasError) {
      setToasts([]); 
      Object.values(newErrors).forEach((err) => err && addToast(err));
      return false;
    }
    return true;
  };

  return {
    isLogin,
    isLoading,
    setIsLoading,
    formData,
    fieldErrors,
    toasts,
    handleInputChange,
    toggleMode,
    removeToast,
    validate,
  };
};