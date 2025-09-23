import React from 'react';
import { SelectItem } from '../../constants/filters';

export type FilterItemProps = {
  title: string;
  listItems: SelectItem[];
  currentValue: string | null;
  onChange: (value: string) => void;
};

export default function FilterItem({
  title,
  listItems,
  currentValue,
  onChange,
}: FilterItemProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <select
        className="block w-full border border-gray-300 rounded-md p-2"
        onChange={e => onChange(e.target.value)}
      >
        {listItems &&
          listItems.map(item => {
            return (
              <option
                key={item.value}
                value={item.value}
                selected={currentValue === item.value}
              >
                {item.label}
              </option>
            );
          })}
      </select>
    </div>
  );
}
