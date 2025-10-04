import type { InputHTMLAttributes } from 'react'

type FormFieldProps = {
  id: string
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
  disabled?: boolean
  placeholder?: string
}

export default function FormField({ id, label, type = 'text', value, onChange, error, className, disabled, placeholder }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={`block text-xs font-medium ${className || 'text-gray-500'}`}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  )
}


