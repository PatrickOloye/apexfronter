import { useState, useEffect } from 'react';
import { api } from '@/libs/http/api';
import SearchableSelect, { SelectOption } from './SearchableSelect';

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
        const { data } = await api.get('https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd');
        if (!mounted) return;

        const formatted: SelectOption[] = data
          .filter((c: any) => c.idd?.root)
          .map((c: any) => {
            const root = c.idd.root;
            // Some countries like US have multiple suffixes. Use the first one for the main code display.
            const suffix = c.idd.suffixes?.length === 1 ? c.idd.suffixes[0] : '';
            const code = `${root}${suffix}`;
            
            return {
              id: c.cca2, // Use CCA2 as unique ID
              value: code,
              label: `${code} ${c.name.common}`,
              image: c.flags?.svg || c.flags?.png,
            };
          })
          .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label));

        setOptions(formatted);
      } catch (err) {
        console.error('Failed to load phone codes', err);
        setOptions([
            { id: 'US', value: '+1', label: '+1 United States', image: 'https://flagcdn.com/us.svg' },
            { id: 'GB', value: '+44', label: '+44 United Kingdom', image: 'https://flagcdn.com/gb.svg' },
        ]);
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
    />
  );
}
