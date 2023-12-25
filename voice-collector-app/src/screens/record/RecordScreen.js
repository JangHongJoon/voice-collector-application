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

const RecordScreen = ({rootNavigateTo}) => {
    const [progress, setProgress] = useState(0);
    const [recordingStatus, setRecordingStatus] = useState(false);
    const [count, setCount] = useState(10);
    const [word, setWord] = useState('');
    const [wordKeys, setWordKeys] = useState(Object.keys(wordJson));

    const [isRecording, setIsRecording] = useState(false);
    const [audioLink, setAudioLink] = useState('');
    const [audioFile, setAudioFile] = useState();
    const [recordDuration, setRecordDuration] = useState(5);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(null);
    const [hexString, setHexString] = useState('');
    
    const reader = new FileReader();
    const WAV_TYPE = 'audio/wav';

    useEffect(() => {
        setWord(wordKeys[0])
    },[])

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
        const currentDate = date.getFullYear()+"-" + date.getMonth() + "-" + date.getDate()+ "-" +
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
      
      useEffect(() => {
        if (recordingStatus){
            const intervalId = setInterval(() => {
                setProgress((prevProgress) => (
                    prevProgress === 359 ? (
                        setRecordingStatus(false),
                        setProgress(0),
                        setIsRecording(false),
                        setFileName(`${currentDate()}_${window.localStorage.getItem('userId')}_${word}.wav`)
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

    const handleSubmit = () => {
        console.log('HI')
        recordSubmit(fileName, hexString, setFileName);
    }
    
    return (
      <InitialBackground>

        <WordContainer>
            <Text style={{marginBottom:'2vh'}}>따라하실 단어</Text>
            <Word>{word}</Word>
        </WordContainer>
        
        <LoadingContainer>
          <OuterCircle>
            <InnerCircle start={0} end={progress} />
            <SmallInnerCircle onClick={handleRecordCountDown} />
          </OuterCircle>
        </LoadingContainer>
  
        <ColumnDiv style={{position:'absolute', top:'55vh', width:'20vw'}}>
            <ReactMic
                record={isRecording}
                onStop={processRecordedAudio}
                mimeType="audio/webm"
                strokeColor="#84B583"
            />
        </ColumnDiv>
  
        <ColumnDiv style={{position:'absolute', bottom:'20vh'}}>
            {!recordingStatus && fileName === '' && (
                <>
                    <Text>버튼을 눌러</Text>
                    <Text>녹음을 시작해주세요</Text>
                </>
            )}
            {!recordingStatus && fileName !== '' && (
                <>
                    <Text>다시 녹음하시려면</Text>
                    <Text>버튼을 눌러주세요</Text>
                </>
            )}
            {!recordingStatus && fileName !== '' && (
                <>
                    <SmallButton style={{bottom:'-5vh'}} onClick={handleSubmit}>제출</SmallButton>
                </>
            )}
            {recordingStatus && (
                <>
                    <Text>따라 읽으세요!</Text>
                    <Text>{count}</Text>
                </>
            )}
            
        </ColumnDiv>


      </InitialBackground>
    )
}

export default RecordScreen;
