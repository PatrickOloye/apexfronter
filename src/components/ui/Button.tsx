import React from "react";

// Define the Button component with props for customization
interface ButtonProps {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ text, icon: Icon, onClick, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg flex items-center justify-center gap-2 transition-colors ${className}`}
      {...props}
    >
      {/* If an icon is provided, render it */}
      {Icon && <Icon className="w-5 h-5" />}
      {/* Always render the text */}
      {text}
    </button>
  );
};

export default Button;