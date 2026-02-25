import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button = ({
  children,
  className = '',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded bg-deep-space text-white hover:bg-blue-green transition-colors duration-200 font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
