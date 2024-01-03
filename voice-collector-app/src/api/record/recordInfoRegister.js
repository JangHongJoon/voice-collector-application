import axios from "axios";

export const recordInfoRegister = (doctorId, nameBlur, gender, birthInput, recordNavigateTo) => {

    const handleRedirect = (res) => {
        window.sessionStorage.setItem('registeredPatientId', res.data.patientID);
        recordNavigateTo('RecordIdShowScreen')  
    }

    const formData = JSON.stringify({
      'userid' : doctorId,
      'name' : nameBlur,
      'gender': gender,
      'birth' : birthInput
    })

    axios.post('/registerNameRoute/inputData/patient/add/', formData , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(() => {
        alert('환자 정보가 등록되지 않았습니다. 입력 정보를 확인해주세요.')
    })
    .then(res => {
        console.log(doctorId)
        console.log(nameBlur)
        console.log(gender)
        console.log(birthInput)
        res === undefined ? console.log('환자 등록 실패') : handleRedirect(res);
        
    })    
  }