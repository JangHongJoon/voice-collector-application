import axios from "axios";

export const joinSubmit = async (idInput, pwInput, emailInput, instituteInput, rootNavigateTo) => {

    const handleRedirect = () => {
        window.localStorage.setItem('userId', idInput)
        rootNavigateTo('RecordScreen')
    }

    const currentDate = () => {
        const date = new Date();
        const currentDate = date.getFullYear()+"-" + date.getMonth() + "-" + date.getDate()+ " " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return currentDate
    }

    const formData = JSON.stringify(
        {
            'userid': idInput,
            'password': pwInput,
            'email': emailInput,
            'facility': instituteInput,
            'last_login': currentDate(),
        }
    )
    


    console.log(idInput)
    console.log(pwInput)
    console.log(emailInput)
    console.log(instituteInput) 
    console.log(currentDate())

    return axios.post('/registerNameRoute/inputData/signin/', formData , {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .catch(() => {
        alert("회원가입이 허용되지 않습니다. 입력된 정보를 확인해주세요.");
    })
    .then(res => {
        res === undefined ? console.log('회원가입 실패') : handleRedirect()
    })

    
}
   