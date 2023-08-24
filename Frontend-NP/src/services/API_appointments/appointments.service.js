import { APIuser } from "../API_user/serviceApiUser.config";

//------------GET AVAILABE APPOINTMENTS --------------
export const getAvailableAppointments = async (formData) => {
  return APIuser.post(`/appointment/available`, formData)
    .then((res) => res)
    .catch((error) => error);
};
