import { useState } from 'react';

import InitialBackground from "../../components/styledComponent/InitialBackground";
import Title from "../../components/styledComponent/Title";
import TextBox from "../../components/styledComponent/TextBox";
import Button from "../../components/styledComponent/Button";
import SmallButton from "../../components/styledComponent/SmallButton";

import { loginSubmit } from '../../api/login/loginApi';

const LoginScreen = ({rootNavigateTo}) => {

    const [idInput, setIdInput] = useState(''); 
    const [pwInput, setPwInput] = useState('');
    const [pwShowingInput, setPwShowingInput] = useState('');

    const handleIdChange = (event) => {
        setIdInput(event.target.value)
    }

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

    const handleNavigate = () => {
        rootNavigateTo('JoinScreen')
    }

    const handleLogin = () => {
        loginSubmit(idInput, pwInput, rootNavigateTo)
    }

    return (
        <InitialBackground>
            
            <Title>로그인</Title>
            <TextBox type="text" id="idInput" placeholder="아이디" 
                        value={idInput} onChange={handleIdChange}/>
            <TextBox type="text" id="pwInput" placeholder="비밀번호" 
                    value={pwShowingInput} onChange={handlePwChange}/>

            <Button onClick={handleLogin}>로그인</Button>
            <SmallButton onClick={handleNavigate}>회원가입</SmallButton>
        </InitialBackground>
    )
}

export default LoginScreen;