import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text = 'در حال بارگذاری...' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className="flex items-center justify-center py-4" role="status" aria-live="polite">
            <div className="flex flex-col items-center space-y-2">
                <div
                    className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}
                    aria-hidden="true"
                />
                <span className="text-sm text-gray-600" aria-label={text}>
                    {text}
                </span>
            </div>
        </div>
    );
};

export default Loading;
