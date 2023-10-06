import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store";
import {GoalSelectors, GoalThunks} from "../../store/goal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faBan} from "@fortawesome/free-solid-svg-icons";
import {UserThunks} from "../../store/user";
import {numberInputCheck} from "../../common/utilsFunctions";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export function GoalChange({closeModal}:{closeModal?: Function}){
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    const selector = useAppSelector(GoalSelectors.getGoal)
    const [goalType, setGoalType] = useState(selector.goalType || 'distance')
    const [goalAmount, setGoalAmount] = useState(selector.goalAmount?.toString() || '0')

    const onConfirm = () => {
        if(goalType !== '' && goalAmount !== '0' && goalAmount !== '' ){
            dispatch(GoalThunks.setGoalType(goalType))
            dispatch(GoalThunks.setGoalAmount(parseInt(numberInputCheck(goalAmount as string) )))
            dispatch(GoalThunks.setGoalDate(Date.now()))
            dispatch(GoalThunks.saveGoal())
            dispatch(UserThunks.updateGoalToFirebase)
            closeModal && closeModal()
        }else{
            toast.error('No correct goal entered')
        }
    }
    return (
        <div className='modalContainer'>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle textCenter'>
                        {t('modals:goalChange:title')}
                    </h3>
                </div>
                <hr className='modalHR'/>
            </section>
            <section className='modalContentContainer flexVTContainer'>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className={'sectionTitle'}>
                        {t('modals:goalChange:type')}:
                        <hr className={'sectionHR'}/>
                    </h1>
                    <div className='flexHZContainer'>
                        <button
                            style={{
                                backgroundColor:goalType === 'distance' ? undefined : '#333',
                                color:goalType === 'distance' ? undefined : 'white'
                            }}
                            className={'addButton changeButton'}
                            onClick={() => setGoalType('distance')}
                        >
                            {t('common:Distance')}
                        </button>
                        <button
                            style={{
                                backgroundColor:goalType !== 'distance' ? undefined : '#333',
                                color:goalType !== 'distance' ? undefined : 'white'
                            }}
                            className={'addButton changeButton'}
                            onClick={() => setGoalType('duration')}>
                            {t('common:Duration')}
                        </button>
                    </div>

                </div>

                <div className='modalContentSection flexVTContainer'>
                    <h1 className={'sectionTitle'}>
                        {t('modals:goalChange:goal')}:
                        <hr className={'sectionHR'}/>
                    </h1>
                    <div className='flexHZContainer'>
                        <input className={'modalNumberInput'}
                               min={0}
                               value={goalAmount}
                               type={'number'}
                               onChange={(event)=>setGoalAmount(event.target.value)}
                        />
                        {
                            goalType === 'distance'?
                                <h1>KM</h1> :
                                <h1> {!isNaN(parseInt(goalAmount)) && parseInt(goalAmount) > 1 ?
                                    t('exercises:minutes') :
                                    t('exercises:minute') }
                                </h1> }
                    </div>
                </div>
                <div className={'modalButtonContainer'}>
                    <button className={'addButton buttonWiden'}
                            onClick={onConfirm}>
                        <FontAwesomeIcon icon={faCheck} size={'2x'}/>
                    </button>
                    <button className={'addButton buttonWiden'}
                            onClick={() => closeModal && closeModal()}>
                        <FontAwesomeIcon icon={faBan} size={'2x'}/>
                    </button>
                </div>
            </section>
        </div>
    );

}
