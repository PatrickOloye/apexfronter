import { useState, useEffect } from 'react';
import SearchableSelect, { SelectOption } from './SearchableSelect';
import { getCountryOptions } from '@/libs/geoOptions';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function CountrySelect({
  value,
  onChange,
  label = "Country",
  placeholder = "Select Country",
  disabled = false,
  className = ''
}: CountrySelectProps) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchCountries = async () => {
      try {
        const formatted = await getCountryOptions();
        if (!mounted) return;
        setOptions(formatted);
      } catch (err) {
        console.error('Failed to load countries', err);
      } finally {
        if (mounted) setLoading(false);
      }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCountries();
    return () => { mounted = false; };
  }, []);

  const displayOptions = (loading && options.length === 0)
    ? [{ value: '', label: 'Loading countries...' }]
    : options;

  return (
    <SearchableSelect
      label={label}
      value={value}
      onChange={onChange}
      options={displayOptions}
      placeholder={loading ? "Loading..." : placeholder}
      disabled={disabled || loading}
      dropUp={true}
      className={className}
    />
  );
}
