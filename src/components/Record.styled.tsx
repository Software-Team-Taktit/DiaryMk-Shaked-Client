import styled from 'styled-components';
import React from 'react'
import {AudioFile} from "../interfaces/AudioFileInterface";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
const RecordStyled = styled.ul`
 
  width: 200px;
  height: 100px;
  background: linear-gradient(0deg, #E5D1FA, #E5D1FA);
  box-shadow: 0 11px 31px rgba(92, 92, 92, 0.3);
  border-radius: 5px;

  /* Inside auto layout */
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  order: 0;
  flex-grow: 0;
`

const RecordField = styled.div`

  flex-direction: column-reverse;
  font-family: 'Roboto',caption;
  font-style:initial;
  font-size: 20px;
  display: flex;
  text-align: center;
 
  color: #000000;
`
const RecordBtn = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 12px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #c9c8c8;
    color: #131212;
    width: 100%;
    height: 20px;
    text-align: center;
    border-radius: 10px;
    display: flex;
  }
`
function Record ({val}:{val:AudioFile|null})  {
    const navigate = useNavigate();

    return(
        val?<RecordStyled onClick={() => {
            navigate(`/${val.recordId}/${val.fileName}`)
        }}>
            <RecordField>{<div>
                <div>{val.fileName} </div>
                <div >{val.dateOfRecord}</div>
                <div>{val.timeOfRecord}</div>
            </div> }</RecordField>

                </RecordStyled>
    :<RecordStyled/>)
}
export default Record

