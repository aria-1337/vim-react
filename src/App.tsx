import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UseKeyPress from './hooks/UseKeypress';
import Line from './components/Line';

export default function App() {
    // PROPS FOR LATER
    const minLines = 10;

    // Storage
    const [rows, setRows] = useState<Array<string>>(['test']);
    const [extraLines, setExtraLines] = useState<Array<string>>([]);

    // INIT
    useEffect(() => {
        // handle initial extra lines
        setExtraLines((_) => {
            const newExtraLines = [];
            for (let i = 0; i < minLines; i++) {
                newExtraLines.push('');
            };
            return newExtraLines;
        });
    }, []);

    // Store + Record keypress events
    const [mem, setMem] = useState<Array<any>>([]);
    const { char, type } = UseKeyPress();
    useEffect(() => {
        setMem((oldMem) => {
            if (char === 'ignore') return oldMem;
            const newMem = [...oldMem, { char, type }]
            while (newMem.length > 1000) { 
                newMem.shift();
            }
            return newMem;
        });
    }, [char, type]);

    return (<DevContainer>
        <VimContainer>
            { rows.map((r, k) => <Line n={k+1} key={k} text={r} />)}
            { extraLines.map((r, k) => <Line n={k - 100000} text={r} />)}
        </VimContainer>

        <DevDivider height="50px" />
        <button onClick={() => setMem([])}>Clear mem</button>
        <DevRow>{`Last key event => ${char} -- ${type}`}</DevRow>
        <DevCol>{ mem.map((i, x) => x > 10 ? null : <DevRow key={x}>{`${i.char} -- ${i.type}`}</DevRow>)}</DevCol>
    </DevContainer>);
}

const VimContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 3px;
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
