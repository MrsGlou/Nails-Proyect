import { updateToken } from "../../utils/updateToken";
import { APIuser } from "../API_user/serviceApiUser.config";

//------------GET SERVICES --------------
export const getServices = async () => {
  return APIuser.get("/service")
    .then((res) => res)
    .catch((error) => error);
};

//------------DELETE SERVICES --------------
export const deleteService = async (formData) => {
  console.log(formData);
  return APIuser.delete("/service", formData._id, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------UPDATE SERVICES --------------
export const updateServices = async (formData) => {
  return APIuser.patch("/service/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
