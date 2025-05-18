import { axiosInstance } from "./index";


const getCardApi = async(data) => {
    return await axiosInstance.get("/api/card", data)
}

const getAllEvents = async(data) => {
    return await axiosInstance.get("/api/card?type=product", data)
}

const applyApi = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.post(
    `/api/card/apply/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const cardDetails = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.post(
    `/api/card/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getUserBookingAPi = async () => {
  const token = localStorage.getItem("token");
  return await axiosInstance.get(
    `/api/card/user-cards`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {withCredentials: true}
  );
};


const getBookingId = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.get(
    `/api/card/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {withCredentials: true}
  );
};






export { getCardApi, getAllEvents, applyApi, cardDetails, getUserBookingAPi, getBookingId }