import React, { useState } from 'react';

import InitialBackground from "../../components/styledComponent/InitialBackground";
import Title from "../../components/styledComponent/Title";
import TextBox from "../../components/styledComponent/TextBox";
import Button from "../../components/styledComponent/Button";
import SmallButton from '../../components/styledComponent/SmallButton';
import ErrorText from '../../components/styledComponent/ErrorText';
import ColumnDiv from '../../components/styledComponent/ColumnDiv';

const PasswordInputScreen = ({ navigateTo, pwInput, setPwInput, pwShowingInput, 
    setPwShowingInput, pwConfirmShowingInput, setPwConfirmShowingInput,
    pwConfirmInput, setPwConfirmInput }) => {



    const hidePassword = (length) => {
        let hiddenPassword = '';
        for (let i=0; i<length; i++){
            hiddenPassword += '*';
        }
        return hiddenPassword
    }

    const handlePwChange = (event) => {
        let lastWord = '';
        let hiddenPassword = '';
        event.target.value.length === 0 ? lastWord = '' : lastWord = event.target.value[event.target.value.length-1];
        event.target.value.length === 0 ? hiddenPassword = '' : hiddenPassword = hidePassword(event.target.value.length-1);
        setPwInput(pwInput.length > event.target.value.length ? 
            pwInput.substring(0,pwInput.length-1) : pwInput+lastWord);
        setPwShowingInput(hiddenPassword + lastWord);
    }

    const handlePwConfirmChange = (event) => {
        let lastWord = '';
        let hiddenPassword = '';
        event.target.value.length === 0 ? lastWord = '' : lastWord = event.target.value[event.target.value.length-1];
        event.target.value.length === 0 ? hiddenPassword = '' : hiddenPassword = hidePassword(event.target.value.length-1);
        setPwConfirmInput(pwConfirmInput.length > event.target.value.length ? 
            pwConfirmInput.substring(0,pwConfirmInput.length-1) : pwConfirmInput+lastWord);
        setPwConfirmShowingInput(hiddenPassword + lastWord);
    }

    const handleNavigateNext = () => {
        navigateTo('UserInfoInputScreen')
    }

    const handleNavigateBack = () => {
        navigateTo('IdInputScreen')
    }

    return (

            <InitialBackground>

            <ColumnDiv>
                <TextBox type="text" id="pwInput" placeholder="비밀번호" 
                    value={pwShowingInput} onChange={handlePwChange}/>
               <ErrorText>비밀번호는 10 ~ 100 자, 1개 이상의 숫자, 소문자, 대문자, 특수문자를 포함해야 합니다.</ErrorText>
            </ColumnDiv>
            
            <ColumnDiv>
            <TextBox type="text" id="pwConfirmInput" placeholder="비밀번호 확인" 
                    value={pwConfirmShowingInput} onChange={handlePwConfirmChange}/>
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
            </ColumnDiv>
            <Button onClick={handleNavigateNext}>다음</Button>
            <SmallButton onClick={handleNavigateBack}>이전</SmallButton>
            </InitialBackground>

    )
} 
export default PasswordInputScreen;