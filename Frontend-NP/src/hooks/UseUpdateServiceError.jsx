import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseUpdateServiceError = (res, setOkUpdate, setRes) => {
  //200: testUpdate: todo a true
  let contador;
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          contador++;
        }
      }
    });
  }

  if (contador == 0) {
    let check = "";
    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `-${clave} -`;
        }
      }
    });
    setOkUpdate(() => true);
    Swal.fire({
      icon: "success",
      title: `Update data service✅`,
      text: ` Update: ${check} `,
      showConfirmButton: false,
      timer: 4000,
    });
  }
  //!--------------- 404_ generico
  //! --------------- 500: interval server error
  if (res?.response?.status == 500 || res?.response?.status == 404) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error! Don't update user ❎ ",
      showConfirmButton: false,
      timer: 1500,
    });

    setRes(() => {});
  }
};
