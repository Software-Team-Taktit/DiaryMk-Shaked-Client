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

 export const uploadFiles = async (file : any , id : string)=>{
    try {
        return await axiosInstance.post(`${prefix}/UploadFiles?id=${id}`,file)
    }
    catch (err){
        console.log(err)
    }
 }

 export const createAsync = async ( filename :string , recordingDuratio : number , data : string )=>{
    try {
        if (filename && data != undefined)
            return await axiosInstance.post(`${prefix}`,filename)
    }
    catch (err:any) {
        console.log(err.message)
    }
 }