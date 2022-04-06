import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Div = styled.body`
    font-family: Helvetica;
    margin: 2%;
`;

export const H1 = styled.h1`
    text-align: center;
    background-color: rgb(92, 193, 178, 0.8);
    padding: 40px;
    margin: 0px;
    font-weight: normal;
`;

export const StyledLink = styled(Link)`
    font-size: 18px;
`;

export const H2 = styled.h2`
    font-weight: normal;
    font-size: ${props => props.small ? "16px" : "28px"};
`;

export const Input = styled.input`
    margin-left: 10px;
    margin-bottom: 15px;
    height: 20px;
    border-color: light gray;
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #FDC094;
    margin-left: 10px;
    border-radius: 10%;
    border-color: #BDB094;
    &:hover {
        background-color: #eb9457;
    }
`;

export const Table = styled.table`
    border: 1px solid;
    border-color: rgb(92, 193, 178, 0.8);
    border-width: 5px;
    border-collapse: collapse;
    width: 60%;
`;

export const TR = styled.tr`
    border: 1px solid;
    border-width: 3px;
    border-color: rgb(92, 193, 178, 0.8);
    font-size: ${props => props.header ? "24px" : "16px"};
    text-align: ${props => props.header ? "center" : "left"};
`;

export const TH = styled.th`
    border: 1px solid;
    border-width: 3px;
    border-color: rgb(92, 193, 178, 0.8);
    padding: 15px;
    font-weight: normal;
    width: ${props => props.col1 ? "2%" : props.col3 ? "0%" : "50%"};
`;

export const Li = styled.li`
    display: inline;
`;
