import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  variant = 'primary',
  onClick,
  children,
  className,
  ...restProps
}) => {
  const getVariantClasses = {
    primary: 'bg-yellow-300',
    outline: 'border-2 text-yellow-300 border-yellow-300',
  };
  return (
    <button
      className={clsx(getVariantClasses[variant], 'font-alfa rounded-xl', className)}
      type="button"
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
