import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card = ({ children, header, footer, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-deep-space">
          {header}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm">
          {footer}
        </div>
      )}
    </div>
  );
};
