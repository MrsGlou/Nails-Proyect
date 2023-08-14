import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//--------- LOGIN ----------
export const loginUser = async (formData) => {
  return APIuser.post("/user/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//--------- FORGOT PASSWORD ----------
export const forgotPasswordUser = async (formData) => {
  return APIuser.patch("/user/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const sendPasswordUser = async () => {
  return APIuser.get("/user/forgotpassword/sendpassword/:id")
    .then((res) => res)
    .catch((error) => error);
};

//--------- VALIDATED CODE ----------
export const validatedCodeUser = async (formData) => {
  return APIuser.post("/user/validated", formData)
    .then((res) => res)
    .catch((error) => error);
};

//--------- RESEND VALIDATED CODE ----------

export const resendValidatedUser = async (formData) => {
  return APIuser.post("/user/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//------------DELETE USER --------------
export const deleteUser = async () => {
  return APIuser.delete("/user/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------UPDATE USER --------------
export const updateUser = async (formData) => {
  return APIuser.delete("/user/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------GET USERS --------------
export const getUsers = async () => {
  return APIuser.get("/user")
    .then((res) => res)
    .catch((error) => error);
};
