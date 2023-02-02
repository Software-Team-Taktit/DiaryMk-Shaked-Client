import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {getTextById} from "../services/TextService";
import {Text} from "../interfaces/TextInterface";
import { useNavigate } from "react-router-dom";
import {getDownloadAudioFile} from "../services/AudioFileService";
import ReactAudioPlayer from 'react-audio-player';
import { MantineProvider } from '@mantine/core';


function Record(){

    const [textRecording , setTextRecording] = useState<Text>();
    const [audioRecord, setAudioRecord] = useState('');

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
        <MantineProvider withGlobalStyles withNormalizeCSS>
            {textRecording  ?
                <ul>
                    <div className="text">
            <li>text : {textRecording.data}</li></div>
            <ReactAudioPlayer
            src={`https://localhost:7215/api/AudioFile/getthefiles?fileName=${filename}`}
            autoPlay
            controls
        />
        </ul>: <h2>There is no text for the recording</h2>}
        <li></li>
            <div className="button" onClick={()=>navigate('/Recordings')}>back
        </div>
            </MantineProvider>

    </div>);
}
export default Record;