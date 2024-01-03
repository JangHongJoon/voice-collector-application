import React, { useState } from 'react';
import InitialBackground from '../../components/styledComponent/InitialBackground';
import TextBox from '../../components/styledComponent/TextBox';
import Button from '../../components/styledComponent/Button';
import RowDiv from '../../components/styledComponent/RowDiv';
import RadioBox from '../../components/styledComponent/RadioBox';
import Text from '../../components/styledComponent/Text';
import Title from '../../components/styledComponent/Title';
import SmallButton from '../../components/styledComponent/SmallButton';

import {recordInfo} from '../../api/record/recordInfo';

function RecordInfoScreen({rootNavigateTo, recordNavigateTo}) {
  
  const [idInput, setIdInput] = useState('');
  const [nameInput, setNameInput] = useState('')
  const [birthInput, setBirthInput] = useState('')
  const [gender, setGender] = useState('');

  const handleIdChange = (event) => {
    setIdInput(event.target.value)
  }
  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  }

  const handleBirthChange = (event) => {
      setBirthInput(event.target.value);
  }

  const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

    
    const hideName = (length) => {
      let hiddenName = '';
      for (let i=1; i<length; i++){
          hiddenName += '*';
      }
      return hiddenName
  }

  const handleNavigateToRecord = () => {
    const doctorId = window.localStorage.getItem('userId');
    const nameBlur = nameInput[0] + hideName(nameInput.length);
    console.log(idInput)
    console.log(nameInput)
    console.log(birthInput)
    console.log(gender)
    recordInfo(doctorId, idInput, nameBlur, gender, birthInput, recordNavigateTo)
  }

  const handleNavigateToRegister = () => {
    recordNavigateTo('RecordInfoRegisterScreen')
  }

  const handleLogout = () => {
    window.localStorage.clear();
    rootNavigateTo('LoginScreen');
  }
  
  return (
    <InitialBackground>
      <Title>녹음 정보</Title>
      <TextBox type="text" id="idInput" placeholder="환자 아이디" 
                  value={idInput} onChange={handleIdChange}/>
      <TextBox type="text" id="pwInput" placeholder="이름" 
              value={nameInput} onChange={handleNameChange}/>
      <TextBox type="text" maxLength={6} id="birthInput" placeholder="생년월일 (ex. 990427)" 
              value={birthInput} onChange={handleBirthChange}/>
      <RowDiv>
        <RowDiv>
            <RadioBox type="radio" name="maleCheck" value="남" 
                checked={gender === '남'} onChange={handleGenderChange}/>
            <Text>남</Text>
        </RowDiv>
        <RowDiv>
            <RadioBox type="radio" name="femaleCheck" value="여" 
                checked={gender === '여'} onChange={handleGenderChange}/>
            <Text>여</Text> 
        </RowDiv>
      </RowDiv>
      <Button onClick={handleNavigateToRecord}>녹음하기</Button>
      
      <RowDiv>
        <RowDiv>
          <SmallButton onClick={handleNavigateToRegister}>환자등록</SmallButton>
        </RowDiv>
        <RowDiv>
          <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        </RowDiv>
      </RowDiv>
    </InitialBackground>
  )
}

export default RecordInfoScreen;
