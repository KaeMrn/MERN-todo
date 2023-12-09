import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick }) => {
    return (
        <Button className='m-2'
                sx={{ backgroundColor: '#f472b6', color: 'white', '&:hover': { backgroundColor: '#DB7093' } }}
                onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
