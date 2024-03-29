import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface LineProps {
    n: number;
    text: string;
}

export default function Line({ n, text } : LineProps) {
    const [t, setT] = useState<string>(text);
    useEffect(() => {
        setT(() => text);
    }, [text]);

    return (<LineContainer>
        <LineNumber>{ n < 0 ? '~' : n }</LineNumber>
        <CellContainer>
            { t.split('').map((i, k) => <Cell key={k}>{ i }</Cell>) }
        </CellContainer>
    </LineContainer>);
}

const LineContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 5px;
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

const Cell = styled.div`
`;
