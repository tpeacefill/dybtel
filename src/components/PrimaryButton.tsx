import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function PrimaryButton({ children, className = '', type = 'button', disabled, ...rest }: PrimaryButtonProps) {
  const baseClasses =
    'w-full rounded-2xl bg-primary px-6 py-3 text-lg font-regular text-white shadow-[0_8px_14px_rgba(0,0,0,0.18)] transition hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed'

  return (
    <button type={type} disabled={disabled} className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </button>
  )
}


