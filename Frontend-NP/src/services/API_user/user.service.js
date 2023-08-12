//import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//---------LOGIN----------
export const loginUser = async (formData) => {
  return APIuser.post("/user/login", formData)
    .then((res) => res)
    .catch((error) => error);
};
