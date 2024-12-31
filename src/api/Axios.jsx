import axios from "axios";

var axiosclient= axios.create({
    baseURL:"http://localhost:8080/"
})


export default axiosclient;