import React, { useState, useRef } from 'react';

import InitialBackground from "../../components/styledComponent/InitialBackground";
import Title from "../../components/styledComponent/Title";
import TextBox from "../../components/styledComponent/TextBox";
import Button from "../../components/styledComponent/Button";
import SmallButton from '../../components/styledComponent/SmallButton';
import RowDiv from "../../components/styledComponent/RowDiv";
import Text from '../../components/styledComponent/Text';
import ErrorText from '../../components/styledComponent/ErrorText';
import ColumnDiv from '../../components/styledComponent/ColumnDiv';

import { joinSubmit } from '../../api/join/joinApi';
import RadioBox from '../../components/styledComponent/RadioBox';

const EmailAndInstituteInputScreen = ( {
    navigateTo, rootNavigateTo, emailInput, setEmailInput, instituteInput, setInstituteInput, 
    idInput, pwInput, nameInput, birthInput, gender
    } ) => {

    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    }

    const handleInstituteChange = (event) => {
        setInstituteInput(event.target.value);
    }

    const handleJoin = () => {
        joinSubmit(idInput, pwInput, emailInput, instituteInput, rootNavigateTo)
    }

    const handleNavigateBack = () => {
        navigateTo('UserInfoInputScreen')
    }

    return (
            <InitialBackground>
                <ColumnDiv>
                <TextBox type="text" id="emailInput" placeholder="이메일 (ex. test@test.com)" 
                        value={emailInput} onChange={handleEmailChange}/>
                        <ErrorText>이메일을 형식에 맞게 입력해주세요.</ErrorText>
                </ColumnDiv>

                <ColumnDiv>
                <TextBox type="text" id="instituteInput" placeholder="기관" 
                        value={instituteInput} onChange={handleInstituteChange}/>
                    <ErrorText>인가되지 않은 기관입니다.</ErrorText>
                </ColumnDiv>
                
                <Button onClick={handleJoin}>가입하기</Button>
                <SmallButton onClick={handleNavigateBack}>이전</SmallButton>
            </InitialBackground>

    )
} 
export default EmailAndInstituteInputScreen;