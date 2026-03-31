import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';

export const useVehicles = () =>
  useQuery({ queryKey: ['vehicles'], queryFn: () => api.getVehicles().then(r => r.data) });

export const useVehicleInfo    = (id) => useQuery({ queryKey: ['vehicle', id, 'info'],         queryFn: () => api.getVehicleInfo(id).then(r => r.data),    enabled: !!id });
export const useVehicleOwner   = (id) => useQuery({ queryKey: ['vehicle', id, 'owner'],        queryFn: () => api.getVehicleOwner(id).then(r => r.data),   enabled: !!id });
export const useVehicleReg     = (id) => useQuery({ queryKey: ['vehicle', id, 'registration'], queryFn: () => api.getVehicleReg(id).then(r => r.data),     enabled: !!id });
export const useVehicleIns     = (id) => useQuery({ queryKey: ['vehicle', id, 'insurance'],    queryFn: () => api.getVehicleIns(id).then(r => r.data),     enabled: !!id });

export const useCreateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
};

export const useDeleteVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
};

export const useUpdateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.updateVehicle(id, data),
    onSuccess: (_, { id }) => qc.invalidateQueries({ queryKey: ['vehicle', id] }),
  });
};