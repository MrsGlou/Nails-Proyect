//import { updateToken } from "../../utils/updateToken";
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
