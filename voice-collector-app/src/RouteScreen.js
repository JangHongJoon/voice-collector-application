import {useState} from 'react';
import { CSSTransition } from 'react-transition-group';

import LoginScreen from './screens/login/LoginScreen';
import JoinScreen from './screens/join/JoinScreen';
import RecordScreen from './screens/record/RecordScreen';

import './css/RouteScreen.css';

const RouteScreen = () => {
    const [currentPage, setCurrentPage] = useState('LoginScreen');

    const rootNavigateTo = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='route-container'>
            <CSSTransition
                in={currentPage === 'LoginScreen'}
                timeout={300} // 애니메이션 지속 시간 (밀리초)
                classNames="page"
                unmountOnExit
            >
                <LoginScreen rootNavigateTo={rootNavigateTo} />
            </CSSTransition>

            <CSSTransition
                in={currentPage === 'JoinScreen'}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <JoinScreen rootNavigateTo={rootNavigateTo} />
            </CSSTransition>

            <CSSTransition
                in={currentPage === 'RecordScreen'}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <RecordScreen rootNavigateTo={rootNavigateTo} />
            </CSSTransition>
        </div>
    )
}

export default RouteScreen

