import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface LineProps {
    n: number;
    text: string;
    cursorPos: [number, number];
    mode: string;
}

export default function Line({ n, text, cursorPos, mode } : LineProps) {
    const [t, setT] = useState<string>(text);
    const [selectedRow, setSelectedRow] = useState<number>(cursorPos[0]);
    const [selectedCell, setSelectedCell] = useState<number>(cursorPos[1]);
    useEffect(() => {
        setT(() => text);
        setSelectedRow(() => cursorPos[0]);
        // TODO: this will be calculated based on mode
        setSelectedCell(() => cursorPos[1]);
    }, [text, cursorPos, mode]);

    return (<LineContainer selected={n === (selectedRow + 1)}>
        <LineNumber>{ n < 0 ? '~' : n }</LineNumber>
        <CellContainer>
            { t.split('').map((i, k) => <Cell selected={(n === (selectedRow + 1) && k === selectedCell)} key={k}>{ i }</Cell>) }
        </CellContainer>
    </LineContainer>);
}

const LineContainer = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 5px;
    background-color: ${props => props.selected ? 'whitesmoke' : 'transparent'};
`;

const LineNumber = styled.p`
    margin: 0;
    font-weight: bold;
    color: orange;
`;

const CellContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 5px;
`;

const Cell = styled.div<{ selected: boolean }>`
    background-color: ${props => props.selected ? 'black' : 'inherit' };
    color: ${props => props.selected ? 'white' : 'inherit' };
    margin: 0.25px;
`;
