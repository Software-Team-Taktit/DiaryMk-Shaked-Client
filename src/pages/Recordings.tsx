import React, {useEffect, useState} from 'react';
import {getAudioFile} from "../services/AudioFileService";
import {AudioFile} from "../interfaces/AudioFileInterface"
import { useNavigate } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import * as FaIcons from 'react-icons/fa'
import AddAudioPopup from "../popup/AddAudioPopup";




const Recordings: React.FunctionComponent = () => {

    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [addAudio,setAddAudio] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');

    const IsOpen =()=>{
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
        ,[addAudio])


    // @ts-ignore
    return (<div >

            <MantineProvider withGlobalStyles withNormalizeCSS>

                {recordsArr.filter((val:AudioFile)=>!search||val.fileName.toLowerCase().includes(search.toLowerCase())).length === 0 && <h2 style={{color:'hotpink'}}>no results</h2>}

                {
                    recordsArr.filter((val:AudioFile)=>!search||val.fileName.toLowerCase().includes(search.toLowerCase())).map((val: AudioFile, index) => <div key={index} className="audio">
                        <ul  onClick={() => {
                            navigate(`/Recordings/${val.recordId}/${val.fileName}`)
                        }}>
                            <li>name : {val.fileName}</li>
                            <li>date of record : {val.dateOfRecord}</li>
                            <li></li>
                        </ul>
                    </div>
                    )

                }
                <div>
                    <FaIcons.FaSistrix className='searchIcon'/>
                    <input className="searchBar"
                placeholder={'search'}
                onChange={(e)=>{setSearch(e.target.value)}}/></div>

                {!addAudio&&
                    <button onClick={IsOpen} className="btn-modal">
                    Open
                </button>
                }

            {addAudio && (
                <div className="modal">
                    <div onClick={IsOpen} className="overlay"></div>
                    <div className="modal-content">
                       <AddAudioPopup setPoppedUp={setAddAudio}/>

                        </div>
                </div>)}

        </MantineProvider>
        </div>)
}

export default Recordings
