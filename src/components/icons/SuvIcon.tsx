import React from 'react';

export function SuvIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        {/* Main Body */}
        <rect x="70" y="100" width="60" height="200" rx="10" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        {/* Hood */}
        <path d="M70 110 C 70 90, 130 90, 130 110 Z" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="2"/>

        {/* Roof */}
        <rect x="75" y="120" width="50" height="160" rx="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="80" y="125" width="40" height="150" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />


        {/* Wheels */}
        <rect x="55" y="115" width="10" height="35" rx="3" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="135" y="115" width="10" height="35" rx="3" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="55" y="250" width="10" height="35" rx="3" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="1" />
        <rect x="135" y="250" width="10" height="35" rx="3" fill="currentColor" stroke="hsl(var(--primary))" strokeWidth="1" />
    </svg>
  );
}
