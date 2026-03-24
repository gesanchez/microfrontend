import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = LucideIcons[name] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <LucideIcon className={className} {...props} />;
};
