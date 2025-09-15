import Swal from "sweetalert2";
import { useCallback } from "react";
// Make sure you import your CSS file here
import './styles.css'; 

export const Toast = () => {
    const Toass = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // Correct way to set z-index
        customClass: {
            popup: 'swal2-toast-on-top'
        },
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const showToast = useCallback((icon, title) => {
        Toass.fire({
            icon,
            title,
        });
    }, [Toass]);

    return showToast;
};