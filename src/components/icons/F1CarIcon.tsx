import React from 'react';

export function F1CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 220"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path d="M 50, 10 
                 L 40, 20 
                 L 60, 20 
                 L 50, 10 Z" strokeWidth="2" />
        <path d="M 45, 20 
                 L 55, 20 
                 L 55, 40 
                 L 45, 40 
                 L 45, 20 Z" strokeWidth="2" />

        <path d="M 30, 40 
                 L 70, 40 
                 L 80, 60 
                 L 20, 60 
                 L 30, 40 Z" strokeWidth="3" />
        
        <path d="M 20, 60 
                 L 80, 60 
                 L 85, 120 
                 L 15, 120 
                 L 20, 60 Z" strokeWidth="3" />

        <path d="M 50, 65 
                 C 52, 70 52, 75 50, 80 
                 L 40, 80 
                 L 40, 65 
                 L 50, 65 Z" strokeWidth="2" />

        <path d="M 15, 120 
                 L 85, 120 
                 L 80, 180 
                 L 20, 180 
                 L 15, 120 Z" strokeWidth="3" />

        <path d="M 5, 125 
                 L 15, 125 
                 L 15, 175 
                 L 5, 175 
                 L 5, 125 Z" strokeWidth="2" />
        <path d="M 95, 125 
                 L 85, 125 
                 L 85, 175 
                 L 95, 175 
                 L 95, 125 Z" strokeWidth="2" />
        
        <path d="M 20, 180 
                 L 80, 180 
                 L 70, 210 
                 L 30, 210 
                 L 20, 180 Z" strokeWidth="3" />
    </svg>
  );
}
