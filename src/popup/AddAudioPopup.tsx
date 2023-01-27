import React, {useEffect, useState} from 'react';
import { getAudioFile, uploadFiles} from "../services/AudioFileService";
import { MantineProvider } from '@mantine/core';
import {postNewRecord} from "../services/TextService";



const AddAudioPopup: React.FunctionComponent = () => {


    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [formData, setFormData] = useState<any>();
    const [textData,setTextData]= useState<any>()
    const [file,setFileBase64] = useState<File>()
    const time = 5;

    function formSubmit(e: any) {
        e.preventDefault();
        console.log({file})
        alert("here you'd submit the file")
    }


    const SubmitAudio = async () => {
       //const res = await createAsync(formData);
        const res_ = await uploadFiles(File,formData.recordId);
       // setFormData(res && res.data);
        setFileBase64(res_ && res_.data);
    };

    const SubmitNewRecord = async ()=>{
        const res = await postNewRecord(time);
        setFormData(res && res.data);
    }

    useEffect(()=>{
            const initArr = async ()=>{
                const res = await getAudioFile() ;
                setRecordsArr(res && res.data);
            }

            initArr();
        }
        ,[])


    return (<div>
        <MantineProvider withGlobalStyles withNormalizeCSS>
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
                <div className="button" onClick={ ()=>{SubmitNewRecord()}
                }>Start new Record and submit her</div>
            </form>

        </MantineProvider>
    </div>)
}

export default AddAudioPopup
