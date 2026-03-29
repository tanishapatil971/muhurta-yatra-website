export default function AddPackage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">
          Add Package
        </h2>
        <p className="mt-1 text-sm text-[#8A7E74]">
          Fill in the details below to list a new travel package.
        </p>
      </div>

      <div className="p-8 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm space-y-8">
        {/* Basic Info */}
        <div>
          <h3 className="flex items-center gap-2 pb-2 mb-6 text-lg font-serif font-bold border-b-2 border-[#EDE6D6]">
            <span>📍</span> Basic Information
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Destination
              </label>
              <input
                type="text"
                placeholder="e.g. Manali, Himachal Pradesh"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Base Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 12000"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Max People
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
              />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 font-bold tracking-wide text-white uppercase transition-all bg-[#C75B2A] rounded-xl hover:bg-[#B54E22] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(199,91,42,0.3)] hover:shadow-[0_6px_20px_rgba(199,91,42,0.4)] text-sm">
          ✈️ Add Package
        </button>
      </div>
    </div>
  );
}
