import React from 'react'
import styled from 'styled-components'

const SearchText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Search: React.FunctionComponent = () => {
    return (
        <SearchText>Team</SearchText>
    )
}

export default Search
