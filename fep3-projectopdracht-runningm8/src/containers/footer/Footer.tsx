import React from 'react';
import {useNavigate} from "react-router-dom";
import {faPersonRunning, faChartLine, faUser, faTableList, faHouseChimney} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Footer() {
    const navigate = useNavigate()
    const onClick = (destination: string) => {
        navigate('/app/' + destination)
    }
    return (
        <div className='footerContainer'>
            <div className='footerSubContainer'>
                <button onClick={()=>onClick('home')}
                        className='footerButton' data-cy="buttonHome">
                    <FontAwesomeIcon icon={faHouseChimney}
                                     size={'2x'}
                                     color={'white'}/>
                </button>
                <h1>
                    |
                </h1>
                <button onClick={()=>onClick('schemas')}
                        className='footerButton leftButton' data-cy="buttonSchemas">
                    <FontAwesomeIcon icon={faTableList}
                                     size={'2x'}
                                     color={'white'}/>
                </button>
            </div>
            <button onClick={()=>onClick('run')}
                    className='footerMiddleButton' data-cy="buttonRun">
                <FontAwesomeIcon icon={faPersonRunning}
                                 size={'4x'}
                                 color={'white'}/>
            </button>
            <div className='footerSubContainer'>
                <button onClick={()=>onClick('analysis')}
                        className='footerButton rightButton' data-cy="buttonAnalysis">
                    <FontAwesomeIcon icon={faChartLine}
                                     size={'2x'}
                                     color={'white'}/>
                </button>
                <h1>
                    |
                </h1>
                <button onClick={()=>onClick('profile')}
                        className='footerButton' data-cy="buttonProfile">
                    <FontAwesomeIcon icon={faUser}
                                     size={'2x'}
                                     color={'white'}/>
                </button>
            </div>
        </div>
    );
}

export default Footer;
