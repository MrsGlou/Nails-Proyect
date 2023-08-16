import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseValidatedCodeError = (
  res,
  setDeleteUser,
  setValidatedOk,
  setUser,
  setReloadPageError,
  setRes
) => {
  console.log("entro 200");
  //200 : todo ok ---> testValidatedOk: true
  if (res?.data?.testValidatedOk?.toString() == "true") {
    // comprobamos que vengas del login con el localStorage
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseCurrentUser = JSON.parse(currentUser);
      const customUser = {
        ...parseCurrentUser,
        check: true,
      };
      // como quiero volver a meterlo al local tengo que volver a convertirlo en un string
      const customUserString = JSON.stringify(customUser);
      setUser(() => customUser);
      localStorage.setItem("user", customUserString);
    }
    setValidatedOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Ok correct code ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //200 : todo ok ---> testValidatedOk: false
  if (res?.data?.testValidatedOk?.toString() == "false") {
    Swal.fire({
      icon: "error",
      title: "Interval server error ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
    setRes(() => {});
  }

  //200: usuario borrado includes('error delete user')

  if (res?.data?.delete?.includes("error delete user")) {
    Swal.fire({
      icon: "error",
      title: "No correct Code ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
    setRes(() => {});
  }
  //200: usuario no borrado includes ('ok delete user')
  if (res?.data?.delete?.includes("ok delete user")) {
    setDeleteUser(() => true);
    Swal.fire({
      icon: "error",
      title: "No correct Code ❎.",
      text: "Your user is delete. Contact to your admin, please.",
      showConfirmButton: false,
      timer: 2500,
    });
    setRes(() => {});
  }

  //404: 'User not found' --> Ha recargado y no tenemos la cuenta
  // Usuario se lleva por la via del login

  if (res?.response?.data?.includes("User not found")) {
    setReloadPageError(() => true);
    Swal.fire({
      icon: "error",
      title: "Interval server error ❎.",
      text: "No delete user. Try login, please.",
      showConfirmButton: false,
      timer: 1500,
    });

    setRes(() => {});
  }
  //404: error en acutializaciçon del user
  if (res?.response?.status == 404) {
    Swal.fire({
      icon: "error",
      title: "Interval server error ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {});
  }
  //500: interval server error
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
