import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const alertConfirmation = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const confirm = useCallback(async (options = {}) => {
    const defaultOptions = {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    };

    const result = await Swal.fire({ ...defaultOptions, ...options });

    if (result.isConfirmed) {
      setIsConfirmed(true);
      return true;
    } else {
      setIsCanceled(true);
      return false;
    }
  }, []);

  return { isConfirmed, isCanceled, confirm };
};