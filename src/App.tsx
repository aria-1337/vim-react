import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UseKeyPress from './hooks/UseKeypress';

export default function App() {
    // Store + Record keypress events
    const [mem, setMem] = useState<Array<any>>([]);
    const { char, type } = UseKeyPress();
    useEffect(() => {
        setMem((oldMem) => [...oldMem, { char, type }]);
    }, [char]);


    return (<DevContainer>
        <VimContainer>
        </VimContainer>

        <DevDivider height="50px" />
        <DevRow>{`Last key event => char: ${char} type: ${type}`}</DevRow>
        <DevCol>{ mem?.reverse().map((i, x) => x > 7 ? null : <DevRow key={x}>{`${i.char} -- ${i.type}`}</DevRow>)}</DevCol>
    </DevContainer>);
}

const VimContainer = styled.div`
    display: flex;
    flex-direction: column;
`;


// ------------------------------------------------------------------------ Dev/Testing styling

const DevDivider = styled.div<{ height: string }>`
    min-width: 10px;
    min-height: ${props => props.height};
`;

const DevContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DevRow = styled.div`
    display: flex;
    flex-direction: row;
    background-color: black;
    color: white;
    padding: 10px;
`;

const DevCol = styled.div`
    display: flex;
    flex-direction: column;
`;
