import React from 'react';

type BlockProps = {
  children: React.ReactNode;
};

export default function Block({ children }: BlockProps) {
  return (
    <div className="shadow-md bg-white border border-gray-100 rounded-md p-4">
      {children}
    </div>
  );
}
