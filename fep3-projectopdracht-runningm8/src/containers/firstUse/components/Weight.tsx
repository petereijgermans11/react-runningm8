import React, {useEffect, useState} from 'react';

import {useNavigate, useOutletContext} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import { UserThunks} from "../../../store/user";
import {toast} from "react-toastify";
import {numberInputCheck} from "../../../common/utilsFunctions";
import {useTranslation} from "react-i18next";

function Weight() {
    //@ts-ignore
    const [screenNumber, setScreenNumber] = useOutletContext()
    useEffect(()=>{
        setScreenNumber(3)
    }, [setScreenNumber, screenNumber])

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const [weight, setWeight] = useState('0')
    const [weightUnit, setWeightUnit] = useState('KG')

    const navigation = () => {
        navigate('/firstUse/height')
    }
    const onConfirm = () => {
        if(weight === '' || weight === '0'){
            toast.error('No correct weight entered')
        }else{
            dispatch(UserThunks.setWeight( parseInt(numberInputCheck(weight))))
            dispatch(UserThunks.setWeightUnit(weightUnit))
            navigation()
        }
    }
    return (
        <div className='container'>
            <div className='inputContainer screenContentSection padderTwo'>
                <h1>
                    {t('firstUse:weight:title')}
                </h1>
                    <input
                        data-cy='inputWeight'
                        value={weight}
                        className='basicInput'
                        type={'number'}
                        onChange={(event)=>setWeight(event.target.value)}
                    />
                    <div onClick={()=>setWeightUnit(weightUnit === 'KG'? 'lbs':'KG')}>
                        <button
                            data-cy='buttonImperial'
                            className='left textCenter'
                            style={{
                                backgroundColor: weightUnit === 'lbs' ? undefined: '#333'}}>
                            {t('common:lbs')}
                        </button>
                        <button
                            data-cy='buttonMetric'
                            className='right textCenter'
                            style={{backgroundColor: weightUnit !== 'lbs' ? undefined: '#333'}}>
                            KG
                        </button>
                    </div>
                    <button className={'addButton buttonWiden'} onClick={onConfirm} data-cy='buttonConfirm'>
                        {t('buttons:confirm')}
                    </button>
            </div>
            <span className="ripple"/>
        </div>
    );
}

export default Weight;
