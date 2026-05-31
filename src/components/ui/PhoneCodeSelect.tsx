import { useState, useEffect } from 'react';
import SearchableSelect, { SelectOption } from './SearchableSelect';
import { getPhoneCodeOptions } from '@/libs/geoOptions';

interface PhoneCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function PhoneCodeSelect({
  value,
  onChange,
  label,
  placeholder = "Code",
  disabled = false,
  className = ""
}: PhoneCodeSelectProps) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchCodes = async () => {
      try {
        const formatted = await getPhoneCodeOptions();
        if (!mounted) return;
        setOptions(formatted);
      } catch (err) {
        console.error('Failed to load phone codes', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCodes();
    return () => { mounted = false; };
  }, []);

  if (loading && options.length === 0) {
      return (
        <SearchableSelect 
            label={label}
            value=""
            onChange={() => {}}
            options={[{ value: '', label: 'Loading...' }]}
            disabled={true}
            placeholder="Loading..."
            className={className}
          showCheck={false}
          showImages={false}
        />
      )
  }

  return (
    <SearchableSelect
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled || loading}
      className={className}
      showCheck={false}
      showImages={false}
    />
  );
}
