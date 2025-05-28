'use client';
import React, { useState } from 'react';

const Rating = ({ max = 5, value = 0, onChange }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (index) => {
        if (onChange) onChange(index + 1);
    };

    return (
        <div style={{ display: 'flex', cursor: 'pointer' }}>
            {Array.from({ length: max }).map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    style={{ fontSize: '1.5rem', color: index < (hover ?? value) ? '#ffc107' : '#e4e5e9' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
