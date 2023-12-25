import React, { useState } from 'react';

import InitialBackground from "../../components/styledComponent/InitialBackground";
import Title from "../../components/styledComponent/Title";
import TextBox from "../../components/styledComponent/TextBox";
import Button from "../../components/styledComponent/Button";
import SmallButton from '../../components/styledComponent/SmallButton';
import RowDiv from "../../components/styledComponent/RowDiv";
import Text from '../../components/styledComponent/Text';
import ErrorText from '../../components/styledComponent/ErrorText';
import ColumnDiv from '../../components/styledComponent/ColumnDiv';

import RadioBox from '../../components/styledComponent/RadioBox';

const UserInfoInputScreen = ( {navigateTo, nameInput, setNameInput, birthInput, setBirthInput, gender, setGender} ) => {

    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    }

    const handleBirthChange = (event) => {
        setBirthInput(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
      };

    const handleNavigateNext = () => {
        navigateTo('EmailAndInstituteInputScreen')
    }

    const handleNavigateBack = () => {
        navigateTo('PasswordInputScreen')
    }


    return (

            <InitialBackground>

            <ColumnDiv>
            <TextBox type="text" id="nameInput" placeholder="이름" 
                    value={nameInput} onChange={handleNameChange}/>
                <ErrorText>이름을 입력해주세요.</ErrorText>
            </ColumnDiv>
            
            <ColumnDiv>
            <TextBox type="text" maxLength={6} id="birthInput" placeholder="생년월일 (ex. 990427)" 
                    value={birthInput} onChange={handleBirthChange}/>
                    <ErrorText>생년월일을 형식에 맞게 입력해주세요!</ErrorText>
            </ColumnDiv>
            
            <RowDiv>
                <RowDiv>
                    <RadioBox type="radio" name="maleCheck" value="male" 
                        checked={gender === 'male'} onChange={handleGenderChange}/>
                    <Text>남</Text>
                </RowDiv>
                <RowDiv>
                    <RadioBox type="radio" name="femaleCheck" value="female" 
                        checked={gender === 'female'} onChange={handleGenderChange}/>
                    <Text>여</Text> 
                </RowDiv>
            </RowDiv>

            <Button onClick={handleNavigateNext}>다음</Button>
            <SmallButton onClick={handleNavigateBack}>이전</SmallButton>
            </InitialBackground>

    )
} 
export default UserInfoInputScreen;