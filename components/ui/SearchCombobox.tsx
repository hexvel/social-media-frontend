"use client";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchComboboxProps<T> {
  data: T[];
  onSearch: (query: string) => void;
  renderItem: (item: T) => React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export function SearchCombobox<T>({
  data,
  onSearch,
  renderItem,
  value = "",
  onChange,
  placeholder = "Search...",
  className,
  maxHeight = "300px",
  loading = false,
  emptyMessage = "Nothing found",
}: SearchComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onChange?.(value);
    onSearch(value);
    setOpen(true);
  };

  return (
    <div className={cn("relative w-full", className)} ref={inputRef}>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400' />
        <input
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          className='w-full bg-dark/20 rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600'
          placeholder={placeholder}
          onClick={() => setOpen(true)}
        />
        {inputValue && (
          <button
            onClick={() => handleInputChange("")}
            className='absolute right-3 top-1/2 -translate-y-1/2'
          >
            <X className='size-4 text-gray-400 hover:text-gray-200' />
          </button>
        )}
      </div>

      {open && (inputValue || data.length > 0) && (
        <div
          className='absolute z-50 top-full mt-1 w-full bg-primary-theme rounded-lg shadow-lg border border-dark/20'
          style={{ maxHeight }}
        >
          <div className='overflow-y-auto p-2'>
            {loading ? (
              <div className='p-2 text-center text-sm text-gray-400'>
                Loading...
              </div>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className='p-2 hover:bg-dark/20 rounded-md cursor-pointer'
                >
                  {renderItem(item)}
                </div>
              ))
            ) : (
              <div className='p-2 text-center text-sm text-gray-400'>
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
