import React, { useEffect, useState} from 'react';

import {useNavigate, useOutletContext} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import {UserThunks} from "../../../store/user";
import {toast} from "react-toastify";
import {numberInputCheck} from "../../../common/utilsFunctions";
import {useTranslation} from "react-i18next";


function Height() {
    //@ts-ignore
    const [screenNumber, setScreenNumber] = useOutletContext()
    useEffect(()=>{
        setScreenNumber(4)
    }, [setScreenNumber,screenNumber])

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const [height, setHeight] = useState('0')
    const [heightUnit, setHeightUnit] = useState('cm')

    const navigation = () => {
        navigate('/firstUse/goal')
    }
    const onConfirm = () => {
        if(height === '' || height === '0'){
            toast.error('No correct height entered')
        }else{
            dispatch(UserThunks.setHeight( parseInt(numberInputCheck(height))))
            dispatch(UserThunks.setHeightUnit(heightUnit))
            navigation()
        }
    }
    return (
        <div className='container'>
            <h1>
                {t('firstUse:height:title')}
            </h1>
            <div className={'inputContainer'}>
                <input
                    data-cy='inputHeight'
                    value={height}
                    className={'basicInput'}
                    type={'number'}
                    onChange={(event) =>  setHeight(event.target.value)}
                />
                <div onClick={()=>setHeightUnit(heightUnit === 'cm'? 'inch':'cm')}>
                    <button
                        data-cy='buttonCm'
                        className={'left lbs'}
                        style={{
                            backgroundColor: heightUnit === 'cm' ? undefined: '#333'
                        }}
                    >
                        cm
                    </button>
                    <button
                        data-cy='buttonInch'
                        className={'right kg'}
                        style={{backgroundColor: heightUnit !== 'cm' ? undefined: '#333'}}>
                        {t('common:inch')}
                    </button>
                </div>
                <button className='addButton buttonWiden' onClick={onConfirm} data-cy='buttonConfirm'>
                    {t('buttons:confirm')}
                </button>
            </div>
            <span className="ripple"/>
        </div>
    );
}

export default Height;
