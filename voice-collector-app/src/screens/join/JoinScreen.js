import React, { useState } from 'react';
import { CSSTransition } from "react-transition-group";

import IdInputScreen from './IdInputScreen';
import PasswordInputScreen from './PasswordInputScreen';
import UserInfoInputScreen from './UserInfoInputScreen';
import EmailAndInstituteInputScreen from './EmailAndInstituteInputScreen';

import InitialBackground from '../../components/styledComponent/InitialBackground';
import Title from '../../components/styledComponent/Title';
import SmallButton from '../../components/styledComponent/SmallButton';

const JoinScreen = ({rootNavigateTo}) => {
    const [idInput, setIdInput] = useState(''); 
    const [pwInput, setPwInput] = useState('');
    const [pwShowingInput, setPwShowingInput] = useState('');
    const [pwConfirmShowingInput, setPwConfirmShowingInput] = useState('');
    const [pwConfirmInput, setPwConfirmInput] = useState('');
    const [nameInput, setNameInput] = useState('')
    const [birthInput, setBirthInput] = useState('')
    const [gender, setGender] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [instituteInput, setInstituteInput] = useState('');

    const [currentPage, setCurrentPage] = useState('IdInputScreen');

    const navigateTo = (page) => {
        setCurrentPage(page);
    }

    const handleRootNavigate = () => {
        rootNavigateTo('LoginScreen')
    }
    
    return (
        <InitialBackground>
            <Title>회원가입</Title>
            {currentPage === 'IdInputScreen' && 
                <IdInputScreen navigateTo={navigateTo} 
                handleRootNavigate={handleRootNavigate}
                idInput={idInput} setIdInput={setIdInput}/>}
            {currentPage === 'PasswordInputScreen' 
                && <PasswordInputScreen navigateTo={navigateTo} 
                pwInput={pwInput} setPwInput={setPwInput}
                pwShowingInput={pwShowingInput} setPwShowingInput={setPwShowingInput} 
                pwConfirmShowingInput={pwConfirmShowingInput} setPwConfirmShowingInput={setPwConfirmShowingInput}
                pwConfirmInput={pwConfirmInput} setPwConfirmInput={setPwConfirmInput}/>}
            {currentPage === 'UserInfoInputScreen' 
                && <UserInfoInputScreen navigateTo={navigateTo} 
                nameInput={nameInput} setNameInput={setNameInput} 
                birthInput={birthInput} setBirthInput={setBirthInput}
                gender={gender} setGender={setGender}/>}
            {currentPage === 'EmailAndInstituteInputScreen' 
                && <EmailAndInstituteInputScreen navigateTo={navigateTo} rootNavigateTo={rootNavigateTo}
                emailInput={emailInput} setEmailInput={setEmailInput} 
                instituteInput={instituteInput} setInstituteInput={setInstituteInput}
                idInput={idInput} pwInput={pwInput} nameInput={nameInput} birthInput={birthInput} 
                gender={gender}/>}

        </InitialBackground>
    )
};

export default JoinScreen;
