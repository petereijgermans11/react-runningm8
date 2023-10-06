import React, {useEffect} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import {UserThunks} from "../../../store/user";
import {useTranslation} from "react-i18next";


function Gender() {
    //@ts-ignore
    const [screenNumber, setScreenNumber] = useOutletContext()
    useEffect(()=>{
        setScreenNumber(2)
    }, [setScreenNumber,screenNumber])
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const navigation = () => {
        navigate('/firstUse/weight')
    }
    const onMale = () => {
        dispatch(UserThunks.setGender('Male'))
        navigation()
    }
    const onFemale = () => {
        dispatch(UserThunks.setGender('Female'))
        navigation()
    }

    return (
        <div className='container'>
            <div className='screenContentSection'>
                <h1>{t('firstUse:gender:title')}</h1>
                <div className='buttonsContainer'>
                    <button data-cy='buttonMale' className='addButton buttonWiden' onClick={onMale}>{t('common:male')}</button>
                    <button data-cy='buttonFemale' className='addButton buttonWiden' onClick={onFemale}>{t('common:female')}</button>
                </div>
            </div>
            <span className="ripple"/>
        </div>
    );
}

export default Gender;
