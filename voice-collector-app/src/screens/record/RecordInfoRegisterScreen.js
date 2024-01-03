import React, { useState } from 'react';

import InitialBackground from '../../components/styledComponent/InitialBackground';
import TextBox from '../../components/styledComponent/TextBox';
import Button from '../../components/styledComponent/Button';
import RowDiv from '../../components/styledComponent/RowDiv';
import RadioBox from '../../components/styledComponent/RadioBox';
import Text from '../../components/styledComponent/Text';
import Title from '../../components/styledComponent/Title';
import SmallButton from '../../components/styledComponent/SmallButton';

import { recordInfoRegister } from '../../api/record/recordInfoRegister';

function RecordInfoRegisterScreen({recordNavigateTo}) {

  const [nameInput, setNameInput] = useState('')
  const [birthInput, setBirthInput] = useState('')
  const [gender, setGender] = useState('');

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  }

  const handleBirthChange = (event) => {
      setBirthInput(event.target.value);
  }

  const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

  const handleNavigateBack = () => {
    recordNavigateTo('RecordInfoScreen');
  }

  const hideName = (length) => {
        let hiddenName = '';
        for (let i=1; i<length; i++){
            hiddenName += '*';
        }
        return hiddenName
    }
  
  const handleRegister = () => {
    const doctorId = window.localStorage.getItem('userId');
    const nameBlur = nameInput[0] + hideName(nameInput.length);
    recordInfoRegister(doctorId, nameBlur, gender, birthInput, recordNavigateTo)
  }

  return (
    <InitialBackground>
      <Title>환자 등록</Title>

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
        <Button onClick={handleRegister}>등록하기</Button>
        <SmallButton onClick={handleNavigateBack}>돌아가기</SmallButton>

    </InitialBackground>
  )
}

export default RecordInfoRegisterScreen;
