import React, {useEffect, useRef} from 'react'
import {TextFile} from "../interfaces/TextInterface";
import {AudioFile} from "../interfaces/AudioFileInterface";
import { useNavigate } from "react-router-dom";
import {match} from "assert";
import {postNewRecord} from "../services/TextService";
import {createAsync, uploadFiles} from "../services/AudioFileService";


function ChatText ({content ,textArr , audioArr }:{content:Array<string> ,textArr:Array<TextFile> , audioArr:Array<AudioFile> } )  {
    const navigate = useNavigate();
    const scrollableDiv = useRef<any>(null);
    useEffect(()=>{
        if (scrollableDiv.current){
            scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
        }
    })

    const newRecord = async (filename:string, duration:number)=>{

        const res = await postNewRecord(filename,duration);
        console.log(res&& res.data)
        if (res) {
            await uploadFiles(filename)
            await createAsync(filename, duration, res && res.data);
        }
    }

    return (
        <div ref={scrollableDiv} style={{position:"relative",width: window.innerWidth/2,height:window.innerHeight*0.8,borderRadius:"5px",backgroundColor:"#ECF2FF" , overflowX:"hidden", overflowY:"auto", padding:10}}>
            {content.map((prompt,index,array) =>{
                if(prompt.includes("user:"))
                    return <h4 style={{backgroundColor:"#BA94D1", marginBottom:3, borderRadius: 5 , width:'50%', padding:8, marginLeft: '50%', wordWrap:"break-word"}} dir={'rtl'}>{prompt}</h4>

                 if(prompt === "audios")
                    return audioArr.map((v,index)=><div key={`${v.fileName}${index}`} onClick={()=>{navigate(`/${v.recordId}/${v.fileName}`)}} style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>
                        <h5>filename: {v.fileName}</h5>
                        <h5>dateOfRecord: {v.dateOfRecord+ " " +v.timeOfRecord}</h5>
                    </div>)

                if(prompt === "putAudio")
                     return <h4 style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>מה שם ההקלטה?</h4>

                 if(prompt === "duration")
                     return <h4 style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>מה משך ההקלטה?</h4>

                if(prompt === "record"){
                    let lastFilename = content[content.length - 4].slice(5);
                    let lastDuration =Number(content[content.length - 2].slice(5));

                    const curFilename = content[index-3].slice(5);

                    if(audioArr.length>0 && index ===  array.length-1  && !!!audioArr.find(audio=>audio.fileName===lastFilename))
                        newRecord(lastFilename,lastDuration);
                    return <h4 onClick={()=>navigate(`/${audioArr.find(audio=>audio.fileName=== curFilename)?.recordId}/${curFilename}`)}  style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>{` למעבר להקלטה: ${curFilename} לחץ כאן `}</h4>
                }


                if(prompt.includes("textFile: ")){
                    let numberInString:any = (prompt.match(/(\d+)/));
                    let index =  Number(numberInString[0]);
                    let curTextFile =  textArr[index];

                    return curTextFile &&<div style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>
                        <h5>text: {curTextFile.data}</h5>
                        <h5>dateOfRecord: {curTextFile.dateOfRecord}</h5>
                    </div>
                }

                return <h4 style={{backgroundColor:"#E5D1FA", marginBottom:3, borderRadius: 5 ,width:"60%",wordWrap:"break-word", padding:10}}>{prompt}</h4>

            })}
        </div>
    )
}
export default ChatText