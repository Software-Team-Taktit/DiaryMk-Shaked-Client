import {axiosInstance} from "./AxiosInstance"


const prefix = "api/Text"

export const getTextById = async (textId : string)=>{
    try {
        return await axiosInstance.get(`${prefix}/${textId}`);
    }
    catch (err){
        console.log("There is no text for the recording")
        return null;
    }
}

export const postNewRecord = async (timeToRecord : number )=>{
    try {
        return await axiosInstance.post(`${prefix}/UploadAudio?secondToRecord=${timeToRecord}`)
    }
    catch (err){
        console.log(err)
        return null;
    }
}
