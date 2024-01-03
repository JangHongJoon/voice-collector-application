import React, { useState } from 'react';

import InitialBackground from '../../components/styledComponent/InitialBackground';
import Button from '../../components/styledComponent/Button';
import Title from '../../components/styledComponent/Title';
import Text from '../../components/styledComponent/Text';


function RecordIdShowScreen({recordNavigateTo}) {

    const handleNavigateToBack = () => {
        window.sessionStorage.clear();
        recordNavigateTo('RecordInfoScreen');
    }
  return (
    <InitialBackground>
        <Title>등록 완료</Title>
        <Text style={{fontSize: 20, }}>환자 ID : {window.sessionStorage.getItem('registeredPatientId')}</Text>
        <Text style={{marginTop : 20, fontSize: 15, color:'#FF6161'}}>환자 ID는 꼭 기록해두세요!</Text>
        <Button onClick={handleNavigateToBack}>돌아가기</Button>
    </InitialBackground>
  )
}

export default RecordIdShowScreen;
