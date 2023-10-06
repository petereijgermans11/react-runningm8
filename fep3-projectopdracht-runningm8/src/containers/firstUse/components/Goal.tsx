import React, {useEffect, useState} from 'react';

import {useNavigate, useOutletContext} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import {UserThunks} from "../../../store/user";
import {GoalThunks} from "../../../store/goal";
import {toast} from "react-toastify";
import {numberInputCheck} from "../../../common/utilsFunctions";
import {useTranslation} from "react-i18next";
import {AppThunks} from "../../../store/app";


function Goal() {
    //@ts-ignore
    const [screenNumber, setScreenNumber] = useOutletContext()
    useEffect(()=>{
        setScreenNumber(5)
    }, [setScreenNumber,screenNumber])

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    const [goalType, setGoalType] = useState('distance')
    const [goalAmount, setGoalAmount] = useState('0')

    const navigation = () => {
        navigate('/')
    }

    const onConfirm = () => {
        if(goalType !== '' && goalAmount !== '0' && goalAmount !== ''){
            dispatch(GoalThunks.setGoalType(goalType))
            dispatch(GoalThunks.setGoalAmount(parseInt(numberInputCheck(goalAmount)) ))
            dispatch(GoalThunks.setGoalDate(Date.now()))
            dispatch(UserThunks.setUser())
            dispatch(GoalThunks.saveGoal())
            dispatch(AppThunks.setFirstUse())
            navigation()
        }else{
            // insert toast error message
            toast.error('No correct goal entered')
        }
    }
    return (
        <div className='container'>
            <h1>
                {t('firstUse:goal:title')}
            </h1>
            <div className={'buttonsContainer'}>
                <button
                    data-cy='buttonDistance'
                    style={{
                        backgroundColor:goalType === 'distance'
                            ? undefined : '#333'
                    }}
                    className={'addButton buttonWiden'}
                    onClick={() => setGoalType('distance')}
                >
                    {t('common:distance')}
                </button>
                <button
                    data-cy='buttonDuration'
                    style={{
                        backgroundColor:goalType !== 'distance'
                            ? undefined : '#333'
                    }}
                    className={'addButton buttonWiden'}
                    onClick={() => setGoalType('duration')}
                >
                    {t('common:duration')}
                </button>
            </div>
            <div className='goalInputContainer'>
                <input
                    data-cy='inputGoal'
                    className={'basicInput'}
                    min={0}
                    value={goalAmount}
                    type={'number'}
                    onChange={(event)=>setGoalAmount(event.target.value)}
                />
                {
                    goalType === 'distance'?
                        <h1>
                            KM
                        </h1> :
                        <h1>
                            {t('common:minutes')}
                        </h1>}
            </div>
            <button
                data-cy='buttonConfirm'
                className={'addButton buttonWiden'}
                onClick={onConfirm}>
                {t('buttons:confirm')}
            </button>
            <span className="ripple"/>
        </div>
    );
}

export default Goal;
