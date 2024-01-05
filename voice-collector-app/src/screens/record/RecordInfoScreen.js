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
      <Title>Recoirding Info</Title>
      <TextBox type="text" id="idInput" placeholder="Patient ID" 
                  value={idInput} onChange={handleIdChange}/>
      <TextBox type="text" id="pwInput" placeholder="Patient Name" 
              value={nameInput} onChange={handleNameChange}/>
      <TextBox type="text" maxLength={6} id="birthInput" placeholder="Birth Year, Month, Day (ex. 990427)" 
              value={birthInput} onChange={handleBirthChange}/>
      <RowDiv>
        <RowDiv>
            <RadioBox type="radio" name="maleCheck" value="M" 
                checked={gender === 'M'} onChange={handleGenderChange}/>
            <Text>Male</Text>
        </RowDiv>
        <RowDiv>
            <RadioBox type="radio" name="femaleCheck" value="F" 
                checked={gender === 'F'} onChange={handleGenderChange}/>
            <Text>Female</Text> 
        </RowDiv>
      </RowDiv>
      <Button onClick={handleNavigateToRecord}>Record Start</Button>
    
        <RowDiv>
          <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        </RowDiv>
        
    </InitialBackground>
  )
}

export default RecordInfoScreen;
