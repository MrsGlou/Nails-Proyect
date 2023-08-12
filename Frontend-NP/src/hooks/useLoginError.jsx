import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useLoginError = (res, setLoginOk, userLogin, setRes) => {
  //Respuesta 200-> todo ok
  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      _id: res.data.user._id,
      image: res.data.user.image,
      check: res.data.user.check,
    };

    const dataString = JSON.stringify(dataCustom);
    userLogin(dataString);
    setLoginOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Welcome to my Page 💌",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //Respuesta 404: Usuario o contraseña mal

  if (res?.response?.data?.includes("password dont match")) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password or user dont match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ------------------- 404: 'User no register'
  if (res?.response?.data?.includes("User no register")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password or user dont match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {});
  }
  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
