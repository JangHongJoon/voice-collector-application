import axios from "axios";

export const loginSubmit = (idInput, pwInput, rootNavigateTo) => {

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
            'last_login': currentDate(),
        }
    )

    console.log(idInput)
    console.log(pwInput)
    console.log(currentDate())


    axios.post('/registerNameRoute/inputData/login/', formData , {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .catch(() => {
        alert('로그인이 허용되지 않습니다. 입력된 정보를 확인해주세요.')
    })
    .then(res => {
        res === undefined ? console.log('로그인 실패') : handleRedirect()
        
    })
}
   