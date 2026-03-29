import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs';
import { useVehicleInfo, useVehicleOwner, useVehicleReg, useVehicleIns } from '../hooks/useVehicles';

function Section({ data, isLoading }) {
  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-slate-400 text-sm animate-pulse">Loading...</p>
    </div>
  );

  if (!data) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-slate-400 text-sm">No data found.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </p>
          <p className="text-sm font-medium text-slate-700 break-words">
            {String(val)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const info = useVehicleInfo(id);
  const owner = useVehicleOwner(id);
  const reg = useVehicleReg(id);
  const ins = useVehicleIns(id);

  const tabs = [
    { label: '🚗 Info',         content: <Section data={info.data}  isLoading={info.isLoading} /> },
    { label: '👤 Owner',        content: <Section data={owner.data} isLoading={owner.isLoading} /> },
    { label: '📋 Registration', content: <Section data={reg.data}   isLoading={reg.isLoading} /> },
    { label: '🛡️ Insurance',    content: <Section data={ins.data}   isLoading={ins.isLoading} /> },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vehicle Details</h1>
          <p className="text-slate-400 text-xs mt-1 font-mono">{id}</p>
        </div>
      </div>

      {/* Tabs Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <Tabs tabs={tabs} />
      </div>

    </div>
  );
}