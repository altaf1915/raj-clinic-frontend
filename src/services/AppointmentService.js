import api from "../axios/api";

export async function bookAppointment(appointmentData) {
  const { data } = await api.post(
    "/appointments",
    appointmentData
  );

  return data;
}

