import { useState, useEffect } from 'react';
import { api } from '@/libs/http/api';
import SearchableSelect, { SelectOption } from './SearchableSelect';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function CountrySelect({
  value,
  onChange,
  label = "Country",
  placeholder = "Select Country",
  disabled = false
}: CountrySelectProps) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchCountries = async () => {
      try {
        const { data } = await api.get('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        if (!mounted) return;

        const formatted = data
          .map((c: any) => ({
            value: c.cca2, // This user wants the country code value, normally CCA2 implies ISO code (e.g. US, GB)
            label: c.name.common,
            image: c.flags?.svg || c.flags?.png,
            id: c.cca2
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));

        setOptions(formatted);
      } catch (err) {
        console.error('Failed to load countries', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCountries();
    return () => { mounted = false; };
  }, []);

  if (loading && options.length === 0) {
      return (
        <SearchableSelect 
            label={label}
            value=""
            onChange={() => {}}
            options={[{ value: '', label: 'Loading countries...' }]}
            disabled={true}
            placeholder="Loading..."
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
    />
  );
}
