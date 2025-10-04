interface EmptyStateProps {
  title: string
  subtitle?: string
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="px-4 py-8 text-center text-white">
      <p>{title}</p>
      {subtitle && (
        <p className="text-sm text-gray-300 mt-2">{subtitle}</p>
      )}
    </div>
  )
}
