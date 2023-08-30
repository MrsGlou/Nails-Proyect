import { APIuser } from "../API_user/serviceApiUser.config";

//------------GET AVAILABE APPOINTMENTS --------------
export const getAvailableAppointments = async (formData) => {
  return APIuser.post(`/appointment/available`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//------------GET APPOINTMENTS BY DAY --------------
export const getByDay = async (formData) => {
  return APIuser.post(`/appointment/getbyday`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//------------CREATE APPOINTMENT --------------
export const createAppointment = async (formData) => {
  return APIuser.post("/appointment/create", formData)
    .then((res) => res)
    .catch((error) => error);
};
