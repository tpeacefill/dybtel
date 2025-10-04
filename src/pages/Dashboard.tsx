import worldMap from '../assets/world-map.svg'
import PrimaryButton from '../components/PrimaryButton'

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#67b58d] to-emerald-600">
      <img src={worldMap} alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />

      {/* Top white card */}
      <div className="relative z-10 mx-auto max-w-md">
        <div className="bg-white/95 backdrop-blur-[1px] rounded-b-[64px] px-6 pt-8 pb-10 shadow-lg">
          {/* Header row (icons placeholders) */}
          <div className="flex items-center justify-end gap-4 text-gray-400">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-5 w-5 rounded-full bg-gray-200" />
          </div>

          {/* Avatar + arc (simple accent) */}
          <div className="mt-4 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border-t-[6px] border-red-500" />
              <img
                src="https://placehold.co/160x160"
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover"
              />
            </div>
          </div>

          <p className="mt-6 text-center text-2xl font-semibold text-gray-800">Kofi Johnson</p>
        </div>

        {/* Balance section */}
        <div className="relative -mt-10 px-6 text-center text-white">
          <p className="text-sm/6 opacity-90">Current Balance</p>
          <p className="mt-2 text-4xl font-extrabold tracking-wide">GHC 53.00</p>
        </div>

        {/* Top Up quick amounts */}
        <div className="mt-6 px-4">
          <p className="text-center text-white/90">Top Up</p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {['50', '100', '150', '200'].map((amt) => (
              <button
                key={amt}
                className="rounded-2xl bg-white/15 p-3 text-center shadow-sm ring-1 ring-white/25 backdrop-blur-[1px]"
              >
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900/25 text-white">
                  ¢
                </div>
                <div className="mt-2 text-white text-lg font-semibold">{amt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div className="mt-6 px-6">
          <label className="block text-sm font-medium text-white/90">Custom Amount</label>
          <input
            type="number"
            placeholder=""
            className="mt-2 w-full rounded-xl border border-white/40 bg-white/95 px-4 py-3 text-gray-800 outline-none ring-primary focus:ring-1 focus:border-primary"
          />
        </div>

        {/* Proceed button */}
        <div className="mt-6 px-6">
          <PrimaryButton className="flex items-center justify-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25">→</span>
            Proceed to Payment
          </PrimaryButton>
        </div>

        {/* Activity history link */}
        <div className="mt-6 pb-8 text-center text-white/90">
          <button className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
            View activity history <span>◦</span>
          </button>
        </div>
      </div>
    </div>
  )
}


