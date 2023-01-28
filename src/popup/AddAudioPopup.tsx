import React, {useEffect, useState} from 'react';
import {createAsync, getAudioFile, uploadFiles} from "../services/AudioFileService";
import { MantineProvider } from '@mantine/core';
import {postNewRecord} from "../services/TextService";



function AddAudioPopup ({setPoppedUp}:{setPoppedUp:Function}) {


    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [formData, setFormData] = useState<any>();
    const [textData,setTextData]= useState<any>();
    const [file,setFileBase64] = useState<File>();
    const [recordTime,setRecordTime] = useState<number>(0);
    const [filename, setFilename] =useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);


    function formSubmit(e: any) {
        e.preventDefault();
        console.log({file})
        alert("here you'd submit the file")
    }

    const updateRecordTime = (time: string) => {
        Number(time) !==0 && setRecordTime(Number(time));
    }


    const SubmitAudio = async () => {
       //const res = await createAsync(formData);
        const res_ = await uploadFiles(File,formData.recordId);
       // setFormData(res && res.data);
        setFileBase64(res_ && res_.data);
    };

    const SubmitNewRecord = async ()=>{

        if(recordTime!=0) {
            setIsRecording(true);
        }
        else {
            console.error("need number")
        }
    }

    useEffect(()=>{
        const startRecording = async ()=> {
            const res = await postNewRecord(recordTime);
            await createAsync(filename, recordTime, res && res.data);
            setPoppedUp((prev: boolean) => !prev);

        }

        startRecording();
    },[isRecording])

    useEffect(()=>{
            const initArr = async ()=>{
                const res = await getAudioFile() ;
                setRecordsArr(res && res.data);
            }

            initArr();
        }
        ,[])


    const updateFilename = (value: string)=> {
        setFilename(value);
    }

    return (<div>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <button className="btn-modal" onClick={()=>{setPoppedUp((prev:boolean)=>!prev)}} >
                Close
            </button>
            <div>
                <h1 style={{color: "#FFB6C1"}}>Create a post</h1>
            </div>


            <form onSubmit={formSubmit}>
                <input type="file" />
                <hr />
                { file &&
                    <p>
                        It's ready to be submitted!<br />
                    </p>}
                <hr />

                <div className="button"  onClick={()=>{SubmitAudio()}}>Submit and check the console</div>
                <br/>

                <h1 style={{color: "#FFB6C1"}} >Start A New Record</h1>
                <h3 style={{color: "#FFB6C1"}} >filename:</h3>
                <input onChange={(e)=>{updateFilename(e.target.value)}}/>
                <h3 style={{color: "#FFB6C1"}} >time of record:</h3>
                <input type={"number"} onChange={(e)=>{updateRecordTime(e.target.value)}}/>
                <br/>
                <div className="button" onClick={ ()=>{SubmitNewRecord(); }
                }>Start new Record and submit her</div>
                {isRecording && <h2>recording</h2>}
            </form>

        </MantineProvider>
    </div>)
}

export default AddAudioPopup
