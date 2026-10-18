import api from "../axios/api";


const saveContactMessage = async (messageData) => {
    const { data } = await api.post("/contact", messageData);
    return data;
};
export { saveContactMessage };