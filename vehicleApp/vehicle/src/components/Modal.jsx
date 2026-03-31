export default function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h3 className="mb-4 font-semibold text-slate-800">Confirm Action</h3>
        <p className="mb-6 text-slate-600">{message}</p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 cursor-pointer text-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white border-none cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}