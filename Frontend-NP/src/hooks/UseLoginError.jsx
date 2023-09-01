import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseLoginError = (res, setLoginOk, userLogin, setRes) => {
  //Respuesta 200-> todo ok
  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      _id: res.data.user._id,
      rol: res.data.user.rol,
      check: res.data.user.check,
      surname: res.data.user.surname,
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

  if (res?.response?.data?.includes("Invalid password")) {
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
  if (res?.response?.data?.includes("User not found")) {
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
