import React, {useEffect, useState} from 'react';
import {getAudioFile} from "../services/AudioFileService";
import {AudioFile} from "../interfaces/AudioFileInterface"
import { useNavigate } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import AddAudioPopup from "../popup/AddAudioPopup";



const Recordings: React.FunctionComponent = () => {

    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [addAudio,setAddAudio] = useState(false)
    const navigate = useNavigate();

    const M =()=>{
        console.log(addAudio)
        setAddAudio(prev=> !addAudio)
    }


    useEffect(()=>{
            const initArr = async ()=>{
                const res = await getAudioFile() ;
                setRecordsArr(res && res.data);
            }

            initArr();
        }
        ,[])


    return (<div >

            <MantineProvider withGlobalStyles withNormalizeCSS>

                {!addAudio&&

                    recordsArr.map((val: AudioFile, index) => <div className="audio">
                        <ul key={index} onClick={() => {
                            navigate(`/Recordings/${val.recordId}/${val.fileName}`)
                        }}>
                            <li>name : {val.fileName}</li>
                            <li>date of record : {val.dateOfRecord}</li>
                            <li></li>
                        </ul>
                    </div>
                    )

                }

                {!addAudio&&
                    <button onClick={M} className="btn-modal">
                    Open
                </button>
                }

            {addAudio && (
                <div className="modal">
                    <div onClick={M} className="overlay"></div>
                    <div className="modal-content">
                       <AddAudioPopup/>
                        <button className="btn-modal" onClick={M}>
                            Close
                        </button>
                        </div>
                </div>)}

        </MantineProvider>
        </div>)
}

export default Recordings
