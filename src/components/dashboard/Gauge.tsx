'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  className?: string;
}

export function Gauge({ value, max, label, unit, className }: GaugeProps) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  // Calculate progress for a 270-degree arc (3/4 of a circle)
  const progress = Math.min(1, Math.max(0, value / max)) * 0.75;
  const offset = circumference * (1 - progress);

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {/* Background track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="10"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={0}
          transform="rotate(135 100 100)"
        />
        {/* Value arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(135 100 100)"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-foreground tabular-nums">
          {value.toFixed(unit === 'x1000' ? 1 : 0)}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
        <span className="text-xs uppercase text-primary mt-2">{label}</span>
      </div>
    </div>
  );
}