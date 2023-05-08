import React, {useEffect, useState} from 'react';
import {createAsync, getAudioFile, uploadFiles} from "../services/AudioFileService";
import {postNewRecord} from "../services/TextService";
import { useNavigate } from "react-router-dom";
import mice from "../assets/mice.gif"
import micNotRecording from "../assets/micNotRecording.png"


function NewSession () {


    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [recordTime,setRecordTime] = useState<number>(0);
    const [filename, setFilename] =useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('sec')
    const navigate = useNavigate();


    const updateRecordTime = (time: string) => {
        Number(time) !==0 && setRecordTime(Number(time));
    }

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
            if (recordTime) {
                let timeWithUnits:number = recordTime;
                switch (selectedRadioBtn){
                    case("min"):
                        timeWithUnits*=60;
                        break;
                    case("hour"):
                        timeWithUnits*=3600;
                        break;
                }
                const res = await postNewRecord(filename,timeWithUnits);
                await uploadFiles(filename)
                await createAsync(filename, recordTime, res && res.data);
                navigate('/');
            }
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



    const isRadioSelected = (value:string):boolean=>selectedRadioBtn === value
    const handleRadioChange = (e:React.ChangeEvent<HTMLInputElement>):void=>setSelectedRadioBtn(e.target.value)
    console.log(selectedRadioBtn);
    return (<div>

            <form >
                <h3 style={{position:"absolute",width:"200px",height:"50px",left:"850px",top:"170px"}}>filename:</h3>
                <input style={{position:"absolute",width:"200px",height:"50px",left:"850px",top:"200px", paddingLeft:5 , paddingRight:5,background: "#DFE8FC",direction: /^[a-zA-Z]+$/.test(filename)?'ltr':'rtl',border:"transparent"}} onChange={(e)=>{setFilename(e.target.value)}}/>
                <h3 style={{position:"absolute",width:"200px",height:"50px",left:"850px",top:"270px"}}>time of record:</h3>
                <input style={{position:"absolute",width:"200px",height:"50px",left:"850px",top:"300px",paddingLeft:5 , paddingRight:5,background: "#DFE8FC",direction: /^[a-zA-Z]+$/.test(filename)?'ltr':'rtl',border:"transparent"}}  type={"number"} onChange={(e)=>{updateRecordTime(e.target.value)}}/>
                <div style={{position:"absolute",width:"200px",height:"50px",left:"850px",top:"350px"}}>
                    <div style={{display:"flex", }}>
                        <input  type={"radio"} value={"sec"} checked={isRadioSelected('sec')} onChange={handleRadioChange} />
                        <h5 style={{fontWeight:"normal",paddingRight:5, paddingLeft:5 }}>seconds</h5>

                        <input  type={"radio"} value={"min"} checked={isRadioSelected('min')} onChange={handleRadioChange} />
                        <h5 style={{fontWeight:"normal" , paddingRight:5, paddingLeft:5}}>minutes</h5>

                        <input  type={"radio"} value={"hour"} checked={isRadioSelected('hour')} onChange={handleRadioChange} />
                        <h5 style={{fontWeight:"normal" , paddingRight:5, paddingLeft:5}}>hours</h5>

                    </div>
                </div>
                <div style={{position:"absolute",width:"120px",height:"50px",left:"900px",top:"400px",background: "#E5D1FA",borderRadius: "10px", padding:"10px 40px"}} onClick={ ()=>{SubmitNewRecord(); }
                }>Start</div>
                {isRecording &&  <img style={{width:1050,marginTop:-250}} src={mice}/>  }
                {!isRecording && <img style={{width:250,marginTop:80,marginLeft:400}} src={micNotRecording}/>}
            </form>

    </div>)
}

export default NewSession
