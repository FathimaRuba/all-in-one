import axios from "axios";

const commonApi = async(apiUrl,apiMethod,apiHeader,apiBody) => {
    const config = {
        url: apiUrl,
        method: apiMethod,
        headers: apiHeader?apiHeader:{'Content-type':'application/json'},
        data: apiBody
    }
    return await axios(config).then(res=>res).catch(err=>{
        console.log(err)
        return err
    })
}

export default commonApi
