import {useState} from 'react';
import { CSSTransition } from 'react-transition-group';

import RecordInfoScreen from './RecordInfoScreen';
import RecordingScreen from './RecordingScreen';
import RecordInfoRegisterScreen from './RecordInfoRegisterScreen';
import RecordIdShowScreen from './RecordIdShowScreen';

import '../../css/RecordScreen.css';

const RecordScreen = ({rootNavigateTo}) => {
    const [recordCurrentPage, setRecordCurrentPage] = useState('RecordInfoScreen');

    const recordNavigateTo = (page) => {
      setRecordCurrentPage(page);
    }

    return (
        <div className='record-container'>
            <CSSTransition
                in={recordCurrentPage === 'RecordInfoScreen'}
                timeout={300} // 애니메이션 지속 시간 (밀리초)
                classNames="page"
                unmountOnExit
            >
                <RecordInfoScreen rootNavigateTo={rootNavigateTo} recordNavigateTo={recordNavigateTo}/>
            </CSSTransition>

            <CSSTransition
                in={recordCurrentPage === 'RecordingScreen'}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <RecordingScreen rootNavigateTo={rootNavigateTo} recordNavigateTo={recordNavigateTo}/>
            </CSSTransition>

            <CSSTransition
                in={recordCurrentPage === 'RecordInfoRegisterScreen'}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <RecordInfoRegisterScreen recordNavigateTo={recordNavigateTo}/>
            </CSSTransition>

            <CSSTransition
                in={recordCurrentPage === 'RecordIdShowScreen'}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <RecordIdShowScreen recordNavigateTo={recordNavigateTo}/>
            </CSSTransition>

        </div>
    )
}

export default RecordScreen

