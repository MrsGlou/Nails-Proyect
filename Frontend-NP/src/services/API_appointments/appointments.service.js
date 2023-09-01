import { APIuser } from "../API_user/serviceApiUser.config";
import { updateToken } from "../../utils/updateToken";

//------------GET AVAILABE APPOINTMENTS --------------
export const getAvailableAppointments = async (formData) => {
  return APIuser.post(`/appointment/available`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//------------GET APPOINTMENTS BY DAY --------------
export const getByDay = async (formData) => {
  return APIuser.post(`/appointment/getbyday`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------CREATE APPOINTMENT --------------
export const createAppointment = async (formData) => {
  return APIuser.post("/appointment/create", formData)
    .then((res) => res)
    .catch((error) => error);
};

//------------DELETE APPOINTMENT --------------
export const deleteAppointment = async (formData) => {
  const _id = formData._id;
  return APIuser.delete(`/appointment/${_id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//------------DELETE APPOINTMENT --------------
export const closedAppointment = async (formData) => {
  const _id = formData._id;
  return APIuser.patch(`/appointment/closed/${_id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
