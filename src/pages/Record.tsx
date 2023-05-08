import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {getTextById, putNewText} from "../services/TextService";
import {TextFile} from "../interfaces/TextInterface";
import { useNavigate } from "react-router-dom";
import {getAudioFile, getDownloadAudioFile} from "../services/AudioFileService";
import 'react-h5-audio-player/lib/styles.css';
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as FcIcons from "react-icons/fc";
import {AudioFile} from "../interfaces/AudioFileInterface";
import ReactH5AudioPlayer from 'react-h5-audio-player';



function Record(){

    const [textRecording , setTextRecording] = useState<TextFile>();
    const [audioRecord, setAudioRecord] = useState('');
    const [editText,setEditText] = useState<boolean>(false);
    const [saveText,setSaveText] = useState<string>('');
    const [textData,setTextData] = useState<AudioFile>() ;
    const ReactAudioPlayer = ReactH5AudioPlayer;



    const { id ,filename } = useParams();

    const navigate = useNavigate();

    const getTextByRecordId = async (rId : string)=> {
        const text = await getTextById(rId);
        if (text)
            return text.data
        return "";
    }

    useEffect( () =>{
          const initText = async ()=> {
              const res = await getTextByRecordId(String(id));
              setTextRecording(res)
              setSaveText(res.data)
              setTextData(res)
          }
          const initAudio = async ()=> {
            const res = filename && await getDownloadAudioFile(filename);
              res && res.data && setAudioRecord(res.data);
          }

        initText();
            initAudio();
          }
        , [])

    return (<div>
            {textRecording  ?
                <div>
                    <h1 className={"header"}>{filename}</h1>
                    <h1 className={"data"}>{textData?.dateOfRecord } {textData?.timeOfRecord}</h1>

                    <button  className={"button"} onClick={ ()=>setEditText( prev => {
                        if (prev) {
                            let newTextFile :TextFile = {...textRecording,data:saveText};
                            setTextRecording(newTextFile);
                            putNewText(textRecording, saveText);
                        }
                        return !prev;
                    })}>{editText?<FcIcons.FcOk/>:<GrIcons.GrEdit/>}</button>

                    <div
                        >
                        {editText?<textarea  className={"text"} onChange={(event)=>setSaveText(event.target.value)} value={saveText} />
                            : <h1 className={"text"}> {textRecording.data}</h1>}

                    </div>

                    <ReactAudioPlayer className={"mediaPlayer"}
                                 src={`https://localhost:7215/api/AudioFile/getthefiles?fileName=${filename}`}
                                 volume={0.5}
                    />




        </div>: <h2>There is no text for the recording</h2>}
        <li></li>
            <button className={"backBtn"} onClick={()=>navigate('/')}> <RiIcons.RiArrowGoBackFill/> </button>


    </div>);
}
export default Record;