"use client";
import React from "react";
import { Mail, ArrowRight, AtSign, LockKeyhole, User2 } from "apen-icons";

// UI Components
import { InputGroup } from "../../components/ui/input-group/InputGroup";
import { Toast } from "../../components/ui/toast/Toast";
import { MainHeading, BodySmall } from "../../components/ui/typography/Typography";
import { Button } from "../../components/ui/button/Button";
import { SocialIcons } from "../../components/ui/icons/SocialIcons";
import { Divider } from "../../components/ui/divider/Divider";

// Hook
import { useAuthForm } from "./useAuthForm";

export const LoginPage = () => {
  const {
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
  } = useAuthForm();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      console.log("Proceeding with Auth:", formData);
      // await yourApiCall(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
      
      {/* Toast Portal */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {toasts.map((t, index) => (
          <Toast
            key={t.id}
            id={t.id}
            message={t.msg}
            index={index}
            total={toasts.length}
            position="bottom-center"
            onClose={removeToast}
          />
        ))}
      </div>

      {/* Main Sidebar Layout */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-[450px] xl:w-[500px] lg:px-12 border-r border-neutral-100 dark:border-surface-800">
        <div className="mx-auto w-full max-w-sm">
          
          <header className="mb-10 text-center lg:text-left">
            <MainHeading>
              {isLogin ? "Welcome back" : "Create an account"}
            </MainHeading>
            <BodySmall className="mt-2 text-neutral-500">
              {isLogin
                ? "Enter your credentials to access your dashboard."
                : "Join our community of developers today."}
            </BodySmall>
          </header>
          
          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Button 
              variant="social" 
              startIcon={<SocialIcons.Github />}
              onClick={() => console.log("Github Login")}
            >
              GitHub
            </Button>
            <Button 
              variant="social" 
              startIcon={<SocialIcons.Google />}
              onClick={() => console.log("Google Login")}
            >
              Google
            </Button>
          </div>

          <Divider className="mb-8">Or continue with</Divider>

          <form className="space-y-3" onSubmit={handleAuth}>
            {!isLogin && (
              <>
                <InputGroup
                  name="fullname"
                  label="Full Name"
                  placeholder="Ibrar Ali"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  error={fieldErrors.fullname}
                  startAddon={<User2 size={18} />}
                />
                <InputGroup
                  name="username"
                  label="Username"
                  placeholder="user_name"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={fieldErrors.username}
                  startAddon={<AtSign size={18} />}
                />
              </>
            )}

            <InputGroup
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              error={fieldErrors.email}
              startAddon={<Mail size={18} />}
            />

            <InputGroup
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={fieldErrors.password}
              startAddon={<LockKeyhole size={18} />}
            />

            <Button 
              type="submit" 
              className="w-full mt-6" 
              isLoading={isLoading}
              endIcon={!isLoading && <ArrowRight size={16} />}
            >
              {isLogin ? "Sign In" : "Get Started"}
            </Button>
          </form>

          {/* Footer Toggle */}
          <footer className="mt-8 text-center">
            <BodySmall className="text-neutral-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Button
                variant="link"
                className="font-semibold"
                onClick={toggleMode}
              >
                {isLogin ? "Sign up" : "Log in"}
              </Button>
            </BodySmall>
          </footer>
        </div>
      </div>

      {/* Decorative Right Side (Optional for LG screens) */}
      <div className="hidden lg:flex flex-1 bg-neutral-50 dark:bg-surface-900 items-center justify-center">
        {/* You can add an illustration or brand logo here */}
      </div>
    </div>
  );
};