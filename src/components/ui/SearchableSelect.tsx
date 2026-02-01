import { Fragment, useState } from 'react';
import { Listbox, Transition, Combobox } from '@headlessui/react';
import { Check, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';

export interface SelectOption {
  value: string;
  label: string;
  shortLabel?: string;
  searchText?: string;
  image?: string;
  id?: string;
}

interface SearchableSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  searchable?: boolean;
  showCheck?: boolean;
  showImages?: boolean;
}

export default function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  searchable = true,
  showCheck = true,
  showImages = true,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  
  const selectedOption = options.find((opt) => opt.value === value);
  const inputPadding = showImages ? 'pl-3' : 'pl-4';

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          (option.searchText || option.label)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className={`relative ${className}`}>
        {label && (
        <label className="block text-sm font-medium text-slate-400 mb-2">
            {label}
        </label>
        )}
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white/5 border border-white/10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center w-full">
                 {showImages && selectedOption?.image ? (
                  <div className="pl-4">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image 
                          src={selectedOption.image} 
                          alt="" 
                          fill
                          className="object-cover" 
                        />
                      </div>
                  </div>
                 ) : null}
                <Combobox.Input
                  className={`w-full border-none py-4 ${inputPadding} pr-10 text-sm leading-5 text-white bg-transparent focus:ring-0 focus:outline-none placeholder-slate-500`}
                  displayValue={(val: string) => {
                    const opt = options.find((o) => o.value === val);
                    return opt ? opt.shortLabel || opt.label : '';
                  }}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={placeholder}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
            </div>
            
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-900 border border-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 scroller">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-slate-400">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id || option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 ${
                        showCheck ? 'pl-10' : 'pl-4'
                      } pr-4 transition-colors duration-150 ${
                        active ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate flex items-center gap-2 ${
                            selected ? 'font-medium text-blue-400' : 'font-normal'
                          }`}
                        >
                            {showImages && option.image && (
                            <div className="relative w-5 h-5 rounded-full overflow-hidden">
                              <Image 
                                src={option.image} 
                                alt="" 
                                fill
                                className="object-cover" 
                              />
                            </div>
                          )}
                          {option.label}
                        </span>
                        {showCheck && selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-blue-400'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
