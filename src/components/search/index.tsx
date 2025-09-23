'use client';
import React, { memo, useCallback } from 'react';
import Block from '../layout/block';

type SearchProps = {
  searchText: string;
  setSearchText: (value: string) => void;
};

const Search = memo(function Search({ searchText, setSearchText }: SearchProps) {
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, [setSearchText]);

  return (
    <Block>
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در وظایف..."
          className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchText}
          onChange={handleInputChange}
          aria-label="جستجو در وظایف"
          role="searchbox"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </Block>
  );
});

export default Search;
