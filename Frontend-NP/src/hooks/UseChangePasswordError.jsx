import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseChangePasswordError = (res, setRes) => {
  //200: updateUser:true
  if (res?.data?.updateUser?.toString() == "true") {
    Swal.fire({
      icon: "success",
      title: "Change password ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {});
  }

  //200: updateUser:false
  if (res?.data?.updateUser?.toString() == "false") {
    Swal.fire({
      icon: "error",
      title: "Interval server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 2500,
    });
    setRes(() => {});
  }

  //404: password dont match
  if (res?.response?.data?.includes("password dont match")) {
    setRes(() => {});
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Old password don't match,  ❎ Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //500: server internal error
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {});
  }
};
