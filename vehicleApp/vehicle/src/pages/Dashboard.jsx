import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useVehicles, useDeleteVehicle } from '../hooks/useVehicles';
import Modal from '../components/Modal';
import { showSuccess, show422Errors } from '../components/Toast';

export default function Dashboard() {
  const { data: vehicles, isLoading } = useVehicles();
  const deleteMutation = useDeleteVehicle();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => { showSuccess('Vehicle deleted'); setDeleteId(null); },
      onError: (err) => { show422Errors(err); setDeleteId(null); },
    });
  };

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
      <p className="text-slate-400 animate-pulse">Loading dashboard...</p>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all registered vehicles</p>
        </div>
        <button
          onClick={() => navigate('/vehicle/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
        >
          + Register Vehicle
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
          <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Vehicles</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{vehicles?.length ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
          <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">New</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            {vehicles?.filter(v => v.vehicleStatus === 'NEW').length ?? 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
          <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Used</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            {vehicles?.filter(v => v.vehicleStatus === 'USED').length ?? 0}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Manufacture</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fuel Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vehicles?.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{v.manufacture}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.model}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.year}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{v.fuelType}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(v.vehicleStatus)}`}>
                    {v.vehicleStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/vehicle/${v.id}`)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/vehicle/${v.id}/edit`)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(v.id)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {vehicles?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No vehicles registered yet.</p>
            <button
              onClick={() => navigate('/vehicle/new')}
              className="mt-4 px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Register your first vehicle
            </button>
          </div>
        )}
      </div>

      {/* Footer count */}
      {vehicles?.length > 0 && (
        <p className="text-sm text-slate-400 mt-4">
          Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
      />
    </div>
  );
}