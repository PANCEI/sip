import Swal from "sweetalert2";
import { useCallback } from "react";
export const Toast=() =>{
 const Toass = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    index: 9999,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }

 })  ;
   const showToast = useCallback((icon, title) => {
    Toass.fire({
      icon,
      title,
    });
  }, [Toass]);

  return showToast; 
}