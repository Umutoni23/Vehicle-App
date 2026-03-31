import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';

export default function Home() {
  const { data: vehicles, isLoading, isError } = useVehicles();
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'NEW': return 'bg-green-100 text-green-700';
      case 'USED': return 'bg-yellow-100 text-yellow-700';
      case 'REBUILT': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500 text-lg animate-pulse">Loading vehicles...</p>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500 text-lg">Failed to load vehicles.</p>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Registered Vehicles</h1>
        <p className="text-gray-500 text-sm mt-1">Browse all registered vehicles in the system</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Manufacture</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fuel Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vehicles?.map((v) => (
              <tr
                key={v.id}
                onClick={() => navigate(`/vehicle/${v.id}`)}
                className="hover:bg-slate-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 text-xs text-slate-400 font-mono">{v.id?.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{v.manufacture}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.model}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.year}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.fuelType}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.vehicleType}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(v.vehicleStatus)}`}>
                    {v.vehicleStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {vehicles?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No vehicles found.</p>
          </div>
        )}
      </div>

      {vehicles?.length > 0 && (
        <p className="text-sm text-slate-400 mt-4">
          Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}