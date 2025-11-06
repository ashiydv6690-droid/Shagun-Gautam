import React from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleClassName?: string;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, className, rippleClassName, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    if (rippleClassName) {
      circle.classList.add(rippleClassName);
    }
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(circle);

    setTimeout(() => {
        if(circle.parentElement) {
            circle.remove();
        }
    }, 600);

    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button {...props} className={`ripple-container ${className || ''}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default RippleButton;