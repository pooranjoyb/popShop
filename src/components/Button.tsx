import React from "react";

interface ButtonProps {
    color?: string;
    hover?: string;
    text?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset"; // Define type prop with specific values
    children?: React.ReactNode; // Ensure children is included in the props
  }  

const Button: React.FC<ButtonProps> = ({ color, hover, text, onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${color} ${hover} ${className}`}
    >
      {text || children}
    </button>
  );
};

export default Button; 