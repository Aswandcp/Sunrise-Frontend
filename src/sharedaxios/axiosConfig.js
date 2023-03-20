import axios from "axios";

export const axiosInstance = async (url, data, method)=>{
    const apiHeader = {headers:{Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),token : 123}};
    // const token = {headers:{ token : 123}};
    
    if(method === 'POST'){
        let result = await axios.post(
            url,
            data,
            apiHeader
        );
        return result;
    }else if(method === 'GET'){
        let result = await axios.get(
            url,
            apiHeader
            
        )
        return result;
    }
}