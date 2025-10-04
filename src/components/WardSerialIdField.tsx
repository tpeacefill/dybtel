interface WardSerialIdFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onIncrement: () => void
  error?: string
}

export default function WardSerialIdField({ 
  value, 
  onChange, 
  onIncrement, 
  error 
}: WardSerialIdFieldProps) {
  return (
    <div>
      <label htmlFor="wardSerialId" className="block text-xs font-medium text-gray-500">
        Ward Serial ID
      </label>
      <div className={`mt-2 flex rounded-xl border ${error ? 'border-red-500' : 'border-gray-300'} bg-white overflow-hidden`}>
        <input
          id="wardSerialId"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="001"
          className="flex-1 px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'wardSerialId-error' : undefined}
        />
        <button
          type="button"
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          onClick={onIncrement}
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </button>
      </div>
      {error ? (
        <p id="wardSerialId-error" className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  )
}
