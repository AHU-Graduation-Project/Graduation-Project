import { cn } from "../../../infrastructure/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors",
        variant === "primary" && "bg-theme text-white hover:opacity-90",
        variant === "secondary" && "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
        variant === "outline" && "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  );
}