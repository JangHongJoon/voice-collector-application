import axios from "axios";

export const recordInfo = (doctorId, idInput, nameBlur, gender, birthInput, recordNavigateTo) => {

    const calculateAge = (birth) => {
      const date = new Date()
      const currentYear = date.getFullYear();
      const year = birth.substring(0,2);
      var intYear = 2000 + parseInt(year);
      if (intYear > currentYear) intYear = intYear - 100;
      return currentYear - intYear; 
    }

    const handleRedirect = () => {
      const session = window.sessionStorage;

      if (nameBlur !== '' && birthInput!== '' && gender !=='' && doctorId !=='' && idInput !==''){
          session.setItem('name', nameBlur);
          session.setItem('age', calculateAge(birthInput));
          session.setItem('gender', gender);
          session.setItem('doctorId', doctorId);
          session.setItem('patientId', idInput);
          recordNavigateTo('RecordingScreen')
      }
      else {
        alert('환자 정보가 정확하지 않습니다. 입력된 정보를 확인해주세요.')
      } 

          
    }

    const formData = JSON.stringify({
      'userid' : doctorId,
      'name' : nameBlur,
      'gender': gender,
      'birth' : birthInput,
      'patientID' : idInput
    })

    // axios.post('/registerNameRoute/inputData/patient/search/', formData , {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .catch(() => {
    //     
    //     return ;
    // })
    // .then(res => {
    //     console.log(doctorId)
    //     console.log(idInput)
    //     console.log(nameBlur)
    //     console.log(gender)
    //     console.log(birthInput)
    //     console.log(res)
    // }) 

    handleRedirect()
  }