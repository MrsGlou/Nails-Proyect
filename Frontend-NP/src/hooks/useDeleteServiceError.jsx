import { deleteService } from "../services/API_services/service.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useDeleteServiceError = (service) => {
  Swal.fire({
    title: "Are you sure you want to delete the service",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteService(service);
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Delete Service",
            showConfirmButton: false,
            timer: 1500,
          });
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No delete service ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
      }
    }
  });
};
