import api from "../axios/api";


const getDoctors = async () => {
    const res = await api.get("/doctors");
    return res.data;
};


export { getDoctors };