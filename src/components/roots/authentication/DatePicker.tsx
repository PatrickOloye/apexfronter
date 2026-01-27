import { useController, Control } from 'react-hook-form';
import { useState } from 'react';

// Define the props type
interface DatePickerProps {
  name: string;
  control: Control<any>;
}

const DatePicker = ({ name, control }: DatePickerProps) => {
  const { field } = useController({ name, control });
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
    field.onChange(selectedDate);
  };

  return (
    <input
      type="date"
      value={date ? date.toISOString().split('T')[0] : ''}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  );
};

export default DatePicker;