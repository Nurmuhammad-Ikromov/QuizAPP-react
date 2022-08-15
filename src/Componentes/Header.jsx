import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Container >
            <Link to = "/" style={{display: "inline-block",padding: "20px", textDecoration: "none", fontSize: "24px"}}> FinalExam</Link>

        </Container>
    );
}

export default Header;
