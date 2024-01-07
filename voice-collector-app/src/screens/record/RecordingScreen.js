import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';


import InitialBackground from "../../components/styledComponent/InitialBackground"
import Text from "../../components/styledComponent/Text"
import LoadingContainer from '../../components/styledComponent/record/LoadingContainer';
import OuterCircle from '../../components/styledComponent/record/OuterCircle';
import InnerCircle from '../../components/styledComponent/record/InnerCircle';
import SmallInnerCircle from '../../components/styledComponent/record/SmallInnerCircle';
import WordContainer from '../../components/styledComponent/record/WordContainer';
import Word from '../../components/styledComponent/record/Word';
import ColumnDiv from '../../components/styledComponent/ColumnDiv';
import SmallButton from '../../components/styledComponent/SmallButton';

// 나중에 바꾸기
import wordJson from '../../wordJson/word'
import { recordSubmit } from '../../api/record/recordSubmit';

const RecordingScreen = ({rootNavigateTo, recordNavigateTo}) => {
    const [progress, setProgress] = useState(0);
    const [recordingStatus, setRecordingStatus] = useState(false);
    const [count, setCount] = useState(10);

    const [word, setWord] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [wordKeys, setWordKeys] = useState(Object.keys(wordJson));
    const [endStatus, setEndStatus] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [audioLink, setAudioLink] = useState('');
    const [audioFile, setAudioFile] = useState();
    const [recordDuration, setRecordDuration] = useState(5);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(null);
    const [hexString, setHexString] = useState('');
    
    const [fileNameList, setFileNameList] = useState([]);
    const [hexStringList, setHexStringList] = useState([]);
  

    const reader = new FileReader();
    const WAV_TYPE = 'audio/wav';

    const name = window.sessionStorage.getItem('name');
    const age = window.sessionStorage.getItem('age');
    const gender = window.sessionStorage.getItem('gender');
    const doctorId = window.sessionStorage.getItem('doctorId');
    const patientId = window.sessionStorage.getItem('patientId');

    useEffect(() => {

      console.log(fileNameList)
      console.log(hexStringList)
      console.log(wordCount)
      console.log(word)
        
        if (wordCount < wordKeys.length ) {
          setWord(wordKeys[wordCount])
          setFileName('')
        }
        else {
          handleBackEndSend();
        }

        setEndStatus(wordCount >= wordKeys.length -1)
    },[wordCount])

    const audioBufferToWav = (buffer) => {
        const numberOfChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
      
        let byteRate = (sampleRate * numberOfChannels * bitDepth) / 8;
        let blockAlign = (numberOfChannels * bitDepth) / 8;
        let dataSize = (buffer.length * numberOfChannels * bitDepth) / 8;
      
        let bufferLength = 44 + dataSize; // 44 bytes for header
        let arrayBuffer = new ArrayBuffer(bufferLength);
        let view = new DataView(arrayBuffer);
      
        function writeString(view, offset, string) {
          for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
          }
        }
      
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + dataSize, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numberOfChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, byteRate, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        writeString(view, 36, 'data');
        view.setUint32(40, dataSize, true);
      
        let offset = 44;
        for (let i = 0; i < buffer.length; i++) {
          for (let channel = 0; channel < numberOfChannels; channel++) {
            let sample = buffer.getChannelData(channel)[i];
            sample = Math.max(-1, Math.min(1, sample));
            sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
            view.setInt16(offset, sample, true);
            offset += 2;
          }
        }
      
        return arrayBuffer;
      }



    reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      const hexString = uint8Array.reduce(
        (acc, byte) => acc + byte.toString(16).padStart(2,'0'), '');
      
      // console.log(hexString);
      setHexString(hexString);
    }
  
  
    useEffect(() => {
      let timer;
      if (isRecording) {
        timer = setTimeout(() => setIsRecording(false), recordDuration * 1000);
      }
      return () => clearTimeout(timer);
    }, [isRecording, recordDuration]);
    
    
    const currentDate = () => {
        const date = new Date();
        const currentDate = date.getFullYear()+"-" + (date.getMonth() + 1) + "-" + date.getDate()+ "-" +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return currentDate
    }
  
    const processRecordedAudio = async (recordedAudio) => {
  
      const audioBuffer = await new AudioContext().decodeAudioData(
        await recordedAudio.blob.arrayBuffer()
      );
  
      
      const wavData = audioBufferToWav(audioBuffer);
      const wavBlob = new Blob([wavData], { type: WAV_TYPE });
        
      reader.readAsArrayBuffer(wavBlob);
    
      setAudioFile(wavBlob);
  
      setAudioLink(URL.createObjectURL(wavBlob));
      setIsDownloaded(true);
    };

    const handleStartRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
          // 사용자가 마이크 권한을 허용한 경우에만 녹음 시작
          setIsMicrophoneAllowed(true);
          setIsRecording(true);
        } catch (error) {
          // 사용자가 마이크 권한을 거부한 경우
          setIsMicrophoneAllowed(false);
          console.error('Error accessing microphone:', error);
        }
      };
      
      //날짜_이름(ex. 장**)_나이_성별_의사ID_환자ID_단어.wav
      useEffect(() => {
        if (recordingStatus){
            const intervalId = setInterval(() => {
                setProgress((prevProgress) => (
                    prevProgress === 359 ? (
                        setRecordingStatus(false),
                        setProgress(0),
                        setIsRecording(false),
                        setFileName(`${currentDate()}_${name}_${age}_${gender}_${doctorId}_${patientId}_${word}.wav`)
                    ) : (prevProgress + 1) % 360
                ));
            }, (count*1000)/360);
            
            const intervalCount = setInterval(() => {
                setCount((prevCount) => {
                  if (prevCount === 0) {
                    clearInterval(intervalCount);
                    return prevCount;
                  }
                  return prevCount - 1;
                });
              }, 1000);

            return () => clearInterval(intervalId, intervalCount);
    
        }
    }, [recordingStatus]);

      const handleRecordCountDown = () => {
        
        if (!recordingStatus){
            setCount(wordJson[word])
            console.log(wordJson[word])
            setRecordDuration(wordJson[word])
            console.log(count)
            setRecordingStatus(true);
            handleStartRecording();  
        } 
    }

    const handleNextWord = async () => {

      if (wordCount < wordKeys.length) {
        console.log('Next');

        const tempFileNameList = [...fileNameList]
        const tempHexStringList = [...hexStringList]
        tempFileNameList.push(fileName)
        tempHexStringList.push(hexString);
  
        setFileNameList(tempFileNameList)
        setHexStringList(tempHexStringList);
        console.log(wordCount)
        setWordCount(wordCount+1);

      }
      else {
        handleBackEndSend();
      }
    
    }
    
    const handleBackEndSend = async () => {
      if (window.confirm('녹음본들을 제출하시겠습니까?')){
        const temp=[1,2,3];
        for (var i=0; i<fileNameList.length; i++){
            // if (i<=1) 
              const response = recordSubmit(fileNameList[i], hexStringList[i]).catch(error => {
                alert('녹음본 제출에 실패하였습니다. 다시 시도해 주십시오. (' + (i) + '/' + fileNameList.length + ' 성공)' )
                return 'error';
              })
              if (response === 'error') return ;
            // else {
            //   const response = await recordSubmit(temp[i], temp[i]).catch(error => {
            //     alert('녹음본 제출에 실패하였습니다. 다시 시도해 주십시오. (' + (i) + '/' + fileNameList.length + ' 성공)' )
            //     return 'error';
            //   })
            //   if (response === 'error') return ;  
            // }       
        }
      }

      else {
        alert('제출을 취소하였습니다.')
        return;
      }  
      alert('제출을 완료하였습니다.');
      recordNavigateTo('RecordInfoScreen')
      window.sessionStorage.clear();
    }

    const handleSubmit = async () => {
        await handleNextWord()
        console.log(fileNameList)
        console.log(hexStringList)
        console.log('HI') 
        // handleBackEndSend()
    }


    return (
      <InitialBackground>

        <WordContainer>
            <Text style={{marginBottom:'2vh'}}>따라하실 단어</Text>
            <Word>{word}</Word>
        </WordContainer>
        
        <LoadingContainer onClick={handleRecordCountDown} >
          
          {!recordingStatus && 
            <img src="img/recordGuideIcon.png" style={{width : '15vh', height:'20vh', zIndex:2, position: 'absolute', left:'100px', top:'100px'}} 
             onClick={handleRecordCountDown}/>
          }

          <OuterCircle>
            <InnerCircle start={0} end={progress} />
            <SmallInnerCircle>
            

                {!recordingStatus && fileName === '' && (
                <>
                    <Text>녹음 시작</Text>
                </>
              )}
              {!recordingStatus && fileName !== '' && (
                  <>
                      <Text>다시 녹음 </Text>
                  </>
              )}
                {recordingStatus && (
                <>
                    <Text>따라 읽으세요!</Text>
                    <Text>{count}</Text>
                </>
              )}
            </SmallInnerCircle>
          </OuterCircle>
          
        </LoadingContainer>

        <ColumnDiv style={{position:'relative', top: 150}}>
            
            {!recordingStatus && fileName !== '' && !endStatus && (
                <>
                    <SmallButton style={{bottom:'5vh'}} onClick={handleNextWord}>다음 단어</SmallButton>
                </>
            )}
            {!recordingStatus && fileName !== '' && endStatus && (
                <>
                    <SmallButton style={{bottom:'5vh'}} onClick={handleSubmit}>제출</SmallButton>
                </>
            )}
        </ColumnDiv>

        <ColumnDiv style={{position:'absolute', bottom: 0}}>
            <ReactMic
                record={isRecording}
                onStop={processRecordedAudio}
                mimeType="audio/webm"
                strokeColor="#84B583"
            />
        </ColumnDiv>
      </InitialBackground>
    )
}

export default RecordingScreen;
