import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://react-burger-3a4a9.firebaseio.com/"
})

export default instance;