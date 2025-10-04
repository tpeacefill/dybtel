interface TopUpAmountButtonProps {
  amount: string
  onClick: () => void
}

export default function TopUpAmountButton({ amount, onClick }: TopUpAmountButtonProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square w-full rounded-2xl bg-[#7ec492] p-2 sm:p-3 text-center shadow-md ring-1 ring-white/25 backdrop-blur-[1px] border border-white/40 cursor-pointer"
    >
      <div className="mx-auto flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#205348] text-white text-xs sm:text-base">
        ¢
      </div>
      <div className="mt-1 text-white text-base sm:text-lg font-semibold">{amount}</div>
    </button>
  )
}
