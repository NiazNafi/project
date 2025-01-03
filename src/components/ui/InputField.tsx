interface InputFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export function InputField({
  type,
  label,
  value,
  onChange,
  icon,
  required = false,
  disabled = false
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            block w-full rounded-lg border border-gray-300 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent
            transition-colors
            disabled:bg-gray-100 disabled:cursor-not-allowed
          `}
        />
      </div>
    </div>
  );
}