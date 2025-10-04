import type { InputHTMLAttributes } from 'react'

type FormFieldProps = {
  id: string
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({ id, label, type = 'text', value, onChange }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-500">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary"
        required
      />
    </div>
  )
}


