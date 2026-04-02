"use client";
import React, { useState } from "react";
import { Mail, ArrowRight, AtSign, LockKeyhole } from "apen-icons";
import { cn } from "../../lib/utils";
import { Toast } from "../../components/toast/Toast";

// --- MAIN PAGE ---
export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // 2. Change state from a single object to an array of toast objects
  const [toasts, setToasts] = useState<{ id: string; msg: string }[]>([]);

  // 3. Update the helper to generate a unique ID and append to the stack
  const showError = (msg: string) => {
    const id = Math.random().toString(36).substr(2, 1000);
    setToasts((prev) => [...prev, { id, msg }]);
  };

  // 4. Helper to remove a specific toast from the stack
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "email" || name === "username")
      finalValue = value.toLowerCase();
    if (name === "password") finalValue = value.replace(/\s/g, "");

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, username } = formData;

    // Validation
    if (!email.includes("@") || !email.includes("."))
      return showError("Invalid email format.");
    if (password.length < 8)
      return showError("Password must be at least 8 characters.");

    if (!isLogin) {
      if (!username) return showError("Username is required.");
      const usernameRegex = /^[a-z0-9._]+$/;
      if (!usernameRegex.test(username))
        return showError(
          "Username: lowercase, numbers, dots, or underscores only.",
        );
    }

    console.log("Proceed with Auth:", formData);
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-surface-950 transition-colors duration-500">
      {toasts.map((t, index) => (
        <Toast
          key={t.id}
          id={t.id}
          message={t.msg}
          index={index}
          total={toasts.length} // Add this
          position="bottom-center"
          onClose={removeToast}
        />
      ))}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-112.5 xl:w-125 lg:px-12 border-r border-neutral-100 dark:border-surface-800">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-sm text-secondary dark:text-neutral-500">
              {isLogin
                ? "Enter your credentials to access your dashboard."
                : "Join our community of developers today."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <SocialButton
              label="GitHub"
              icon={
                <svg
                  viewBox="0 -0.5 25 25"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                </svg>
              }
            />
            <SocialButton
              label="Google"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              }
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100 dark:border-surface-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-surface-950 px-2 text-neutral-400 dark:text-neutral-600">
                Or continue with
              </span>
            </div>
          </div>

          <form className="space-y-3" onSubmit={handleAuth}>
            {!isLogin && (
              <InputGroup
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                icon={<AtSign size={18} />}
                label="Username"
                placeholder="user_name.123"
                type="text"
              />
            )}
            <InputGroup
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail size={18} />}
              label="Email Address"
              placeholder="name@company.com"
              type="email"
            />
            <InputGroup
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              icon={<LockKeyhole size={18} />}
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            <button
              type="submit"
              className="w-full mt-6 h-11 cursor-pointer bg-primary dark:bg-white text-white dark:text-black rounded-xl font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? "Sign In" : "Get Started"}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary dark:text-neutral-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: "", email: "", password: "" });
              }}
              className="cursor-pointer font-semibold text-primary dark:text-white hover:underline underline-offset-4"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const InputGroup = ({ icon, label, ...props }: any) => (
  <div className="space-y-1.5 text-left">
    <label className="text-[10px] font-bold text-secondary dark:text-neutral-500 uppercase tracking-[0.15em] ml-1">
      {label}
    </label>
    <div className="relative group mt-1">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className={cn(
          "w-full h-11 pl-10 pr-4 rounded-xl border outline-none transition-all text-sm",
          // Light Mode
          " border-neutral-100 text-primary placeholder:text-neutral-400",
          // Dark Mode
          "dark:bg-surface-900 dark:border-surface-800 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-surface-600 ",
        )}
      />
    </div>
  </div>
);

const SocialButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    className={cn(
      "flex items-center justify-center gap-2 h-11 w-full rounded-xl border transition-all text-sm font-medium cursor-pointer",
      " border-neutral-100 text-primary hover:bg-neutral-50",
      "dark:bg-surface-900 dark:border-surface-800 dark:text-white dark:hover:bg-surface-800 dark:hover:text-white",
    )}
  >
    <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
    <span className="text-[13px]">{label}</span>
  </button>
);
