import React, { useState } from 'react';

import InitialBackground from "../../components/styledComponent/InitialBackground";
import TextBox from "../../components/styledComponent/TextBox";
import Button from "../../components/styledComponent/Button";
import SmallButton from '../../components/styledComponent/SmallButton';

import ErrorText from '../../components/styledComponent/ErrorText';
import ColumnDiv from '../../components/styledComponent/ColumnDiv';


const IdInputScreen = ({ handleRootNavigate, navigateTo, idInput, setIdInput }) => {   
    
    const handleIdChange = (event) => {
        setIdInput(event.target.value);
    }

    const handleNavigate = () => {
        navigateTo('PasswordInputScreen')
    }

    return (
            <InitialBackground>
            <ColumnDiv>
                <TextBox type="text" id="idInput" placeholder="아이디" 
                        value={idInput} onChange={handleIdChange}/>
                <ErrorText>아이디는 영문, 숫자로만 이루어져야 합니다.</ErrorText>
            </ColumnDiv>

            <Button onClick={handleNavigate}>다음</Button>
            <SmallButton onClick={handleRootNavigate}>로그인</SmallButton>
            </InitialBackground>

    )
} 
export default IdInputScreen;