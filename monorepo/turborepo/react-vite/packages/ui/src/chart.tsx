import type { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ChartContainer = ({ title, children, className = "" }: ChartContainerProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-sm font-medium text-blue-green mb-4">{title}</h3>
      <div className="flex-1 min-h-[200px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
        {children}
      </div>
    </div>
  );
};

export const SimpleStat = ({ label, value, trend, trendType = 'up' }: { 
  label: string; 
  value: string | number; 
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral'
}) => {
  const trendColor = trendType === 'up' ? 'text-green-500' : trendType === 'down' ? 'text-red-500' : 'text-gray-500';
  
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-bold text-deep-space mt-1">{value}</span>
      {trend && (
        <span className={`text-xs font-medium mt-1 ${trendColor}`}>
          {trendType === 'up' ? '↑' : trendType === 'down' ? '↓' : '→'} {trend}
        </span>
      )}
    </div>
  );
};
