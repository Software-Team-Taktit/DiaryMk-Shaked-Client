import {axiosInstance} from "./AxiosInstance"
import {TextFile} from "../interfaces/TextInterface";


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

export const postNewRecord = async (filename: string,timeToRecord : number )=>{
    try {
        return await axiosInstance.post(`${prefix}/UploadAudio?filename=${filename}&secondToRecord=${timeToRecord}`)
    }
    catch (err){
        console.log(err)
        return null;
    }
}

export const getText = async ()=>{
    try {
        return await axiosInstance.get(`${prefix}`);
    }
    catch (err){
        console.log(err)
    }
}

export const putNewText = async (textFile : TextFile, text : string )=>{
    try {
            return await axiosInstance.put(`${prefix}/${textFile.textId}`, {...textFile,data:text})
    }
    catch (err:any){
        console.log(err.message)
    }
 }