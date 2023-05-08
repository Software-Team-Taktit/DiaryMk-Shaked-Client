import styled from 'styled-components';
import React, { useState } from 'react'
import {AudioFile} from "../interfaces/AudioFileInterface";
import Record from "./Record.styled";

const Grid = styled.div`
  /* Recordings */

  /* Auto layout */
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;

`


function RecordsGrid ({recordArr}:{recordArr:Array<AudioFile>})  {
    const missingBlanks =  recordArr.length%3 ? (3-(recordArr.length%3)) : 0;

    return(
<Grid>{recordArr.map((val:AudioFile|null)=><Record val={val}/>)}
    {Array.from({ length:missingBlanks }, (_, i) => <Record val={null}/>)}
</Grid>    )
}
export default RecordsGrid