import axios from "axios";

export const recordSubmit = (fileName, hexString, setFileName) => {

    const handleRecordReset = () => {
        setFileName('');
    }

    const formData = JSON.stringify({
      'fName' : fileName,
      'bytecode' : hexString
    })

    axios.post('/registerNameRoute/inputData/wavUpload/', formData , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(() => {
        alert('녹음이 제출되지 않았습니다. 다시 녹음해주세요.')
    })
    .then(res => {
        res === undefined ? console.log('녹음 제출 실패') : alert('녹음이 제출되었습니다!');
        handleRecordReset();
        
    })    
  }