import React from 'react';
import Button from '@mui/material/Button';

// customButton is a reusable button component that utilizes Material-UI's Button component.
// it accepts various props to customize its behavior and style.

const CustomButton = ({ children, onClick, color, className, icon, type = "button" , textSize = 'text-lg' }) => {
    const buttonClasses = `default-button-styles ${color} ${className} ${textSize}`;
    // combining the default and custom class names for the button

    return (
        <Button 
            type={type}
            className={buttonClasses}
            sx={{ backgroundColor: '#f472b6', color: 'white', '&:hover': { backgroundColor: '#DB7093' } }}
            onClick={onClick}
        >
            {icon && <span className="button-icon">{icon}</span>}
            {children}
        </Button>
    );
};

export default CustomButton;
