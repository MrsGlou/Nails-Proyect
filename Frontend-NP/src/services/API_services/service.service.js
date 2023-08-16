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
  const id = formData._id;
  return APIuser.delete(`/service/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------CREATE SERVICE --------------
export const createService = async (formData) => {
  return APIuser.post("/service/create", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
//------------UPDATE SERVICES --------------
export const updateService = async (customFormData) => {
  console.log(customFormData);
  return APIuser.patch(
    `/service/update/update/${customFormData.id}`,
    customFormData,
    {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};
