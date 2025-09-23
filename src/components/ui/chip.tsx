import React from 'react';
import { ChipProps } from '../../types/ui';

export default function Chip({ label, color, textColor }: ChipProps) {
  return (
    <div
      className={`rounded-xl py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm ${color} ${textColor}`}
    >
      {label}
    </div>
  );
}
