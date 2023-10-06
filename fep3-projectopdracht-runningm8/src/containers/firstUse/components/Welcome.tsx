import React, {useEffect} from 'react';
import '../../../styling/firstUse.scss'
import {useNavigate, useOutletContext} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../store";
import { AppThunks} from "../../../store/app";

// welcome screen
function Welcome() {
    // @ts-ignore - ignoring because this is the way to go with useOutletContext according to the docs
    const [screenNumber, setScreenNumber] = useOutletContext()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    useEffect(()=>{
        setScreenNumber(1)
    }, [setScreenNumber, screenNumber])

    const onContinue = () => {
        navigate('/firstUse/gender')
    }
    const onLanguageChange = (lng:string) => {
        dispatch(AppThunks.setLanguage(lng))
    }
    return (
        <div className='container'>
            <div className={'screenContentSection'}>
                <h1 data-cy="welcome-title" className='textCenter'>
                    {t('firstUse:welcome:title')}
                </h1>
                <h2 className='welcomeText'>
                    {t('firstUse:welcome:sub')}
                </h2>
            </div>
            <button className={'addButton  buttonWiden'} onClick={onContinue} data-cy="button-continue">
                {t('buttons:continue')}
            </button>
            <hr className='screenHR'/>
            <h1 className='textCenter'>
                {t('common:language')}
            </h1>
            <div className='flagContainer'>
                <div>
                    <img
                        data-cy="flagGerman"
                        alt={'Deutsch'}
                        className='languageFlag'
                        src={require('../../../common/images/Flag_of_Germany.svg.png')}
                        onClick={() => onLanguageChange('de')}
                    />
                    <img
                        data-cy="flagDutch"
                        alt={'Nederlands'}
                        className='languageFlag'
                        src={require('../../../common/images/256px-Flag_of_the_Netherlands.svg.png')}
                        onClick={() => onLanguageChange('nl')}
                    />
                    <img
                        data-cy="flagEnglish"
                        alt={'English'}
                        className='languageFlag'
                        src={require('../../../common/images/256px-Flag_of_the_United_Kingdom.svg.png')}
                        onClick={() => onLanguageChange('en')}
                    />
                </div>
                <div>
                    <img
                        data-cy="flagItalian"
                        alt={'Italiano'}
                        className='languageFlag'
                        src={require('../../../common/images/256px-Flag_of_Italy.svg.png')}
                        onClick={() => onLanguageChange('it')}
                    />
                    <img
                        data-cy="flagSpanish"
                        alt={'Espagnol'}
                        className='languageFlag'
                        src={require('../../../common/images/256px-Flag_of_Spain.svg.png')}
                        onClick={() => onLanguageChange('es')}
                    />
                    <img
                        data-cy="flagFrench"
                        alt={'French'}
                        className='languageFlag'
                        src={require('../../../common/images/Flag_of_France.svg.png')}
                        onClick={() => onLanguageChange('fr')}
                    />
                </div>
            </div>
            <span className="ripple"/>
        </div>
    );
}

export default Welcome;
