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

  const displayOptions = (loading && options.length === 0)
    ? [{ value: '', label: 'Loading...' }]
    : options;

  return (
    <SearchableSelect
      label={label}
      value={value}
      onChange={onChange}
      options={displayOptions}
      placeholder={loading ? "Loading..." : placeholder}
      disabled={disabled || loading}
      className={className}
      showCheck={false}
      showImages={false}
    />
  );
}
