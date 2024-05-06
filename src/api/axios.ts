import axios from "axios";


const API = axios.create({
    baseURL: 'https://fedt.unruffledneumann.xyz/api/v1',
    timeout: 1000,
    headers: { 'X-API-Key': 'rLn*xzeZ%U+(PRuK%:v@C(a3j=<.[TWX(F^,EDrv' }
})

export default API