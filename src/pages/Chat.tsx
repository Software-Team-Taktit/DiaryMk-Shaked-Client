import React, {useEffect, useRef, useState} from 'react'
import {getAudioFile} from "../services/AudioFileService";
import {getText} from "../services/TextService";
import {TextFile} from "../interfaces/TextInterface";
import {AudioFile} from "../interfaces/AudioFileInterface";
import ChatText from "../components/ChatText";
import * as FaIcons from "react-icons/fa";


const Chat: React.FunctionComponent = () => {
    if(localStorage.getItem('history')=== null)
        localStorage.setItem("history","[]");

    const prevHistory :any = JSON.parse(localStorage.getItem('history')??"")
    const [history, setHistory] = useState<Array<string>>(prevHistory ?? []);
    const [chatBar, setChatBar] = useState<string>('');
    const [textArr , setTextArr] =  useState<Array<TextFile>>([]) ;
    const [audioArr , setAudioArr] =  useState<Array<AudioFile>>([]) ;
    const sendBtn = useRef<any>(null);

    useEffect(()=>{
            const initArr = async ()=>{
                const res = await getAudioFile() ;
                setAudioArr(res && res.data);

            }
            const initTextArr = async ()=>{
                const res = await getText();
                setTextArr(res && res.data)
            }

            initArr();
            initTextArr();
        }
        ,[])

    useEffect(()=>{
        localStorage.setItem('history',JSON.stringify(history));
    },[history])

    const getCommandByChat =async ()=>{
         setHistory((prevHistory)=>[...prevHistory,`user: ${chatBar}`]);
        let encodedUserText;
       if(!(/[a-zA-Z]/.test(chatBar)))
            encodedUserText =encodeURIComponent(chatBar);
       else encodedUserText = chatBar
        const uri = 'https://api.wit.ai/message?v=20230215&q=' + encodedUserText;
        const auth = 'Bearer ' + `D5WOTPKGSGGUXYSWYPQQ7KMZUAOZCM7F`;
        history[history.length-1]!=="duration" && history[history.length-1]!=="putAudio" && fetch(uri, {headers: {Authorization: auth}})
            .then(res => res.json())
            .then(async (res) => {
                switch (res.intents[0].name) {
                    case 'getAudios':
                        setHistory(prevHistory => [...prevHistory,"audios"])
                        break;

                    case 'getFireCommand':
                        let textFilesToAdd :Array<string> = [];
                        textArr.map((value, index)=>value.data.includes('פקודת אש') && textFilesToAdd.push(`textFile: ${index}`) );
                        textFilesToAdd.length? setHistory(prevHistory => [...prevHistory,...textFilesToAdd])
                            : setHistory(prevHistory => [...prevHistory,"לא תועדו פקודות אש"])
                        break;

                    case 'getTextByName' :
                        if(res.entities["wit$message_subject:message_subject"]) {
                            let keyword = res.entities["wit$message_subject:message_subject"][0].body;
                            if (keyword) {
                                let textFilesToAdd :Array<string> = [];
                                textArr.map((value, index)=>value.data.includes(keyword) && textFilesToAdd.push(`textFile: ${index}`) );
                                textFilesToAdd.length? setHistory(prevHistory => [...prevHistory,...textFilesToAdd])
                                    : setHistory(prevHistory => [...prevHistory,"לא נמצאה מילה זו באף הקלטה"])
                            }
                        }
                         else   setHistory(prevHistory => [...prevHistory,"לא זוהתה מילה לחיפוש במשפטך"]);
                        break;
                    case 'putAudio' :
                        setHistory(prevHistory => [...prevHistory,"putAudio"])
                        break;
                }

            })

        history[history.length-1]==="putAudio" &&setHistory(prevHistory => [...prevHistory,"duration"])
        history[history.length-1]==="duration" && setHistory(prevHistory => [...prevHistory,"record"])
        setChatBar('');

    }
    return (
        <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <ChatText content={history} textArr = {textArr} audioArr = {audioArr}/>
            <div style={{paddingTop:10 ,display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                <input className="chatBar" style={{paddingLeft:10, paddingRight:10,direction: /^[a-zA-Z]+$/.test(chatBar)?'ltr':'rtl'}}
                   placeholder={''}
                   value={chatBar}
                   onChange={(e)=>{setChatBar(e.target.value)}}
                       onKeyDown={(e)=>{if(e.key ==='Enter'){ e.preventDefault(); sendBtn.current.click() } }}/>

                <button ref={sendBtn} className="sendBtn" onClick={getCommandByChat} > <FaIcons.FaRegPaperPlane style={{width:"15px", height:"15px",display:"flex"}}/>  </button>
            </div>
        </div>
    )
}

export default Chat
