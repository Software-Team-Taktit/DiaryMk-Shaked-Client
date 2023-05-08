import React, {useEffect, useState} from 'react';
import {getAudioFile} from "../services/AudioFileService";
import {AudioFile} from "../interfaces/AudioFileInterface"
import { useNavigate } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import * as FaIcons from 'react-icons/fa';
import {getText, getTextById} from "../services/TextService";
import {useSpring, animated} from 'react-spring';
import image from "../assets/ShakedSplashScreen.svg";
import Record from "../components/Record.styled";
import RecordsGrid from "../components/recordsGrid";



const Recordings= ({hadPopped, setHadPopped}:{hadPopped: boolean , setHadPopped:Function})  => {

    const  [recordsArr, setRecordsArr] =  useState([]) ;
    const [textArr , setTextArr] =  useState<Array<string>>([]) ;
    const [addAudio,setAddAudio] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');

    const props = useSpring({
        to:{opacity:0},
        from:{opacity: 1},
        delay:400,
        onRest:()=>{setHadPopped((prev:boolean)=>true)}
    });

    useEffect(()=>{
            const initArr = async ()=>{
                const res = await getAudioFile() ;
                setRecordsArr(res && res.data);

            }
            const initTextArr = async ()=>{
                const res = await getText();
                setTextArr(res && res.data.map((v:any)=>v.data))
            }

            initArr();
            initTextArr();
        }
        ,[addAudio])


    return (<div >
        { !hadPopped && <animated.div style={{...props}}>
            <img className={"logo"} src={image} alt={"Shaked Splash Screen"}/>
        </animated.div>}
        {hadPopped && <div style={{marginLeft:60,display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2>RECORDINGS</h2>
        <div style={{position:"absolute", }}>

        </div>
        <div>

            <input className="searchBar"
                   placeholder={'search'}
                   onChange={(e)=>{setSearch(e.target.value)}}/> <FaIcons.FaSistrix/></div>



                {recordsArr.filter((val: AudioFile, index) => !search || val.fileName.toLowerCase().includes(search.toLowerCase()) ||  textArr[index].includes(search) ).length === 0 && <h2 style={{color:"#E5D1FA"}}>no audio results</h2>}
                {
                    <RecordsGrid recordArr={ recordsArr.filter((val: AudioFile, index:number) => !search || val.fileName.toLowerCase().includes(search.toLowerCase()) || textArr[index].includes(search) )}/>
                }
        </div>}

        </div>)
}

export default Recordings
