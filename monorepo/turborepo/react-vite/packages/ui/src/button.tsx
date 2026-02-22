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
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 bg-sky-500 hover:bg-sky-700 transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
