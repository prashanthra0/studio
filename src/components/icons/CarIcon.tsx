import React from 'react';

export function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          d="M 50,10 
             C 40,20 20,40 20,80 
             L 20,170 
             C 20,190 30,190 35,190 
             L 65,190 
             C 70,190 80,190 80,170 
             L 80,80 
             C 80,40 60,20 50,10 z"
          strokeWidth="4"
        />
        <path
          d="M 45,70 
             L 30,80 30,120 45,130 z"
          strokeWidth="2"
        />
        <path
          d="M 55,70 
             L 70,80 70,120 55,130 z"
          strokeWidth="2"
        />
        <line x1="30" y1="175" x2="70" y2="175" strokeWidth="4" />
      </g>
    </svg>
  );
}
