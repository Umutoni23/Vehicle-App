import toast from 'react-hot-toast';

export const showSuccess = (msg) => toast.success(msg);

export const showError = (msg) => toast.error(msg);

export const show422Errors = (error) => {
  const errors = error?.response?.data?.errors;
  if (Array.isArray(errors)) {
    errors.forEach((err) => toast.error(err.message || err));
  } else {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }
};