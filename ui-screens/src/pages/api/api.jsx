import { toast } from "react-toastify";
import axiosInstance from "./apiinstance";
import axios from "axios";

const handleError = (error) => {
  toast.error(
    error?.response?.data?.messsage ||
      error?.response?.data?.error ||
      error?.message ||
      error?.error?.error ||
      "Something went wrong"
  );
};

export const loginApi = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const recoveryPin = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);

    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const recoveryPassword = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);

    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const registerUser = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const registerVendorBusiness = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/vendor-business/register",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const uploadImage = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const getUsers = async (params) => {
  try {
    const response = await axiosInstance.get("/users/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateProfile = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getOrganizers = async (params) => {
  try {
    const response = await axiosInstance.get("/organizers/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateOrgStatus = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/organizers/update-status/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendors = async (params) => {
  try {
    const response = await axiosInstance.get("/vendors/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateVendorsStatus = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/vendors/update-status/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendorsBusiness = async (params) => {
  try {
    const response = await axiosInstance.get("/vendor-business/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateVendorsBusinessStatus = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/vendor-business/update-status/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getEvents = async (params) => {
  try {
    const response = await axiosInstance.get("/events/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const registerEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/events/register", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const createContact = async (data) => {
  try {
    const response = await axiosInstance.post("/app-contact/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const editEvent = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/events/update-event/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const addServiceEvent = async (data) => {
  try {
    const response = await axiosInstance.post("event-service/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const updateVendorsBusinessStatusEvent = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/event-service/orgainzer-update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateVendorsStatusEvent = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/event-service/vendor-update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const bookEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/booking/book", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const uploadeCertificateEvent = async (data = {}) => {
  try {
    const response = await axiosInstance.put(
      `/booking/update-certificate-url`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const changeUserCheckIn = async (data = {}) => {
  try {
    const response = await axiosInstance.put(`/booking/update-checkin`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getEventBookedUsers = async (params) => {
  try {
    const response = await axiosInstance.get("/booking/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getEventBookedServices = async (params) => {
  try {
    const response = await axiosInstance.get("/event-service/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getSupportTickets = async (params) => {
  try {
    const response = await axiosInstance.get("/app-support/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editSupportTickets = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(`/app-support/update/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getContactTickets = async (params) => {
  try {
    const response = await axiosInstance.get("/app-contact/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editContactTickets = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(`/app-contact/update/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(`/booking/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/events/delete-event/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const getBookinList = async (params) => {
  try {
    const response = await axiosInstance.get("/booking/download-bookings", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};
