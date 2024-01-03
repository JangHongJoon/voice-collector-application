import axios from "axios";

export const recordSubmit = (fileName, hexString) => {

    const formData = JSON.stringify({
      'fName' : fileName,
      'bytecode' : hexString
    })
    

    return axios.post('/registerNameRoute/inputData/wavUpload/', formData , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      // console.log('error')
      throw error
    })  
  }