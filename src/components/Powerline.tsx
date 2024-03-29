import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface PowerlineProps {
    mode: string;
}

export default function Powerline({ mode }: PowerlineProps) {
    const [m, setM] = useState<string>(mode);
    useEffect(() => {
        setM(() => mode);
    }, [mode]);

    return (<Container>
        <LeftDisplay>{ m }</LeftDisplay>
    </Container>);
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: gray;
    color: white;
    padding: 3px 2px;
`;

// Mode | Typing | Error
const LeftDisplay = styled.div`
`;

const RightDisplay = styled.div`
`;
