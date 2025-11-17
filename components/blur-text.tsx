"use client";

import React from "react";

interface BlurTextProps {
  className?: string;
  delay?: number;
  blurAmount?: number;
  children: React.ReactNode;
}

export function BlurText({
  className = "",
  delay = 0,
  blurAmount = 8,
  children,
}: BlurTextProps) {
  return (
    <span
      className={`inline-block transition-all duration-700 ${className}`}
      style={
        {
          animation: `blurInUp 0.8s ease-out forwards`,
          animationDelay: `${delay}ms`,
          filter: `blur(${blurAmount}px)`,
          opacity: 0,
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes blurInUp {
          0% {
            opacity: 0;
            filter: blur(${blurAmount}px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
      `}</style>
      {children}
    </span>
  );
}
