export default function Input({ label, error, register, name, type = 'text', ...rest }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-sm text-slate-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        {...rest}
        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
          ${error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
            : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
          }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}