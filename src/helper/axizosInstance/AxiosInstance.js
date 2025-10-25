import axios from "axios"

const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'
)

console.log(isLocalhost);

const BASEURL = isLocalhost 
    ? "http://localhost:3001" 
    : "https://todo-list-backend-u3jq.onrender.com/" 

console.log(BASEURL);

let axiosInstance = axios.create({
    baseURL: BASEURL
})

export default axiosInstance
