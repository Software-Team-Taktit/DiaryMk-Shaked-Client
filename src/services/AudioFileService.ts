import {axiosInstance} from "./AxiosInstance"


const prefix = "api/AudioFile"

 export const getAudioFile = async ()=>{
    try {
        return await axiosInstance.get(prefix);
    }
    catch (err){
        console.log(err)
    }
}
 export const getDownloadAudioFile = async (fileName : string)=>{
    try {
        return await axiosInstance.get(`${prefix}/getThefiles?fileName=${fileName}`)
    }
    catch (err){
        console.log(err)
    }
 }

 export const uploadFiles = async (filename : any )=>{
    try {

        return await axiosInstance.post(`${prefix}/UploadFiles?filename=${filename}`)
    }
    catch (err){
        console.log(err)
    }
 }

 export const createAsync = async ( filename :string , recordingDuration : number , data : string )=>{
    try {
        if (filename && data !== undefined)
            return await axiosInstance.post(`${prefix}?filename=${filename}&recording=${recordingDuration}&data=${data}`)
    }
    catch (err:any) {
        console.log(err.message)
    }
 }
