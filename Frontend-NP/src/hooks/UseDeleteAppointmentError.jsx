import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteAppointment } from "../services/API_appointments/appointments.service";

export const UseDeleteAppointmentError = (appointmentByDay) => {
  Swal.fire({
    title: "Are you sure you want to delete the appointment",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc136c",
    cancelButtonColor: "#f991cc",
    confirmButtonText: "YES",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteAppointment(appointmentByDay);
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Delete appointment",
            showConfirmButton: false,
            timer: 1500,
          });
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No delete appointment ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
      }
    }
  });
};
