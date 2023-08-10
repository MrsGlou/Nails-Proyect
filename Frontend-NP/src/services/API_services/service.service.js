import { APIuser } from "../API_user/serviceApiUser.config";

//------------GET SERVICES --------------
export const getServices = async () => {
  return APIuser.get("/service")
    .then((res) => res)
    .catch((error) => error);
};
