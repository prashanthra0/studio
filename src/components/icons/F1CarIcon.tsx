import React from 'react';

export function F1CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Main Body */}
      <path d="M100 50 L120 150 L80 150 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      <path d="M90 150 H110 V280 H90 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      
      {/* Front Wing */}
      <path d="M70 60 H130 L120 80 H80 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="3" />

      {/* Rear Wing */}
      <path d="M70 290 H130 L125 310 H75 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="3" />

      {/* Sidepods */}
      <path d="M80 160 L70 200 L70 250 L80 260 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      <path d="M120 160 L130 200 L130 250 L120 260 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />

      {/* Wheels */}
      <rect x="50" y="100" width="20" height="40" rx="5" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="130" y="100" width="20" height="40" rx="5" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="50" y="270" width="20" height="40" rx="5" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="130" y="270" width="20" height="40" rx="5" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />

      {/* Cockpit */}
      <circle cx="100" cy="180" r="15" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="100" cy="180" r="5" fill="hsl(var(--primary))" />
    </svg>
  );
}
