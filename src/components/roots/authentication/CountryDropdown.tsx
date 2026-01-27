import { useController, Control } from 'react-hook-form';
import { countries } from '../../../libs/countries';

// Define the props type
interface CountryDropdownProps {
  name: string;
  control: Control<any>;
}

const CountryDropdown = ({ name, control }: CountryDropdownProps) => {
  const { field } = useController({ name, control });

  return (
    <select
      {...field}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      <option value="">Select a country...</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;