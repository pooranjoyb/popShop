declare module 'react-tilt' {
    import * as React from 'react';
  
    interface TiltOptions {
      reverse?: boolean;
      max?: number;
      perspective?: number;
      scale?: number;
      speed?: number;
      transition?: boolean;
      axis?: null | 'x' | 'y';
      reset?: boolean;
      easing?: string;
    }
  
    interface TiltProps {
      options?: TiltOptions;
      className?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode; // Add this line to include the children property
    }
  
    export const Tilt: React.FC<TiltProps>;
  }
  