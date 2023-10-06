import React, {Fragment, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../store";
import {UserSelectors} from "../../store/user";
import {SchemaThunks} from "../../store/schemas";
import {Difficulty, Exercise, TrainingSchema} from "../../store/schemas/schema.types";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCloudArrowUp,
    faPlus,
    faBan,
    faTrash,
    faCheck, faMobileScreenButton
} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export function AddSchemaModal({closeModal}:{closeModal?: Function}){
    const dispatch = useAppDispatch()
    const { t, ready } = useTranslation();

    const selector = useAppSelector(UserSelectors.getUser)
    const [exercises, setExercises] = useState<Array<Exercise>>([{
        duration: 1,
        text: 'walking'
    }])
    const titlex = t('schemas:title')
    const [title, setTitle] = useState(titlex)
    const [isPublic, setIsPublic] = useState(false)
    const [difficulty, setDifficulty] = useState(Difficulty.easy)
    const [totalTime, setTotalTime] = useState(1)
    while(!ready){
        return <div>'loading...</div>
    }
    const addExercise = () => {
        setExercises(prevState => [...prevState, {
            duration: 1,
            text: 'walking'
        }])
    }
    const removeExercise = (key:number) => {
        if(exercises.length > 1)
        setExercises(prevState => prevState.filter((item, index) => key !== index))
    }
    const editExerciseTitle = (key:number, text:string) => {
        const exercisesCopy = [...exercises]
        for(let exercise of exercisesCopy){
            if(exercisesCopy.indexOf(exercise) === key){
                exercise.text = text
            }
        }
        setExercises(exercisesCopy)
    }
    const editExerciseDuration = async (key:number, duration:string) => {
        const exercisesCopy = [...exercises]
        let totalTimex = 0
        for(let exercise of exercisesCopy){
            if(exercisesCopy.indexOf(exercise) === key){
                exercise.duration = !isNaN(parseInt(duration)) ? parseInt(duration) : 0

            }
            totalTimex += exercise.duration
        }
        setTotalTime(totalTimex)
        setExercises(exercisesCopy)
    }
    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if(exercises.length > 0){
            let good = true;
            for(let exercise of exercises){
                if(exercise.duration === 0){
                    good = false;
                }
            }
            if(!good){
                toast.error('Some exercises do not meet the requirements. Please check.')
            }
            if(title === ''){
                good = false;
                toast.error('The title does not meet the requirements. Please check.')

            }
            if(good){
                let schema:TrainingSchema = {
                    difficulty: difficulty,
                    exercises: exercises,
                    public: isPublic,
                    title: title,
                    totalTime: totalTime
                }
                dispatch(SchemaThunks.addSchema(schema))
                closeModal && closeModal()
            }
        }else{
            toast.warn('Please set at least 1 exercise.')
        }
    }
    const onReset = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        closeModal && closeModal()
    }
    const onShare = () => {
        selector.email !== undefined ?
        setIsPublic(!isPublic) :
            setIsPublic(false)
    }

    return (
        <form className={'modalContainer'} onSubmit={onSubmit} onReset={onReset}>
            <section className={'modalTitleContainer'}>
                <div className={'flexVTContainer modalHR'}>
                    <input
                        value={title}
                        placeholder='...'
                        name={'title'} type={'text'}
                        className={'modalTextInput'}
                        onChange={(event) => setTitle(event.target.value)}/>
                    <hr className={'modalHR'}/>
                </div>
            </section>
            <section className={'modalContentContainer'}>
                <section className={'modalContentSection flexVTContainer'}>
                    <h1 className='sectionTitle'>
                        {t('schemas:sharing')}
                        <hr className='sectionHR'/>
                    </h1>
                    <div className={'modalButtonContainer '}>
                        <button
                            type={'button'}
                            className="addButton buttonWiden"
                            onClick={onShare}
                            style={{
                                    backgroundColor: isPublic ? undefined : "#333",
                                    color:isPublic ? undefined : "white"
                            }}>
                            <FontAwesomeIcon icon={faCloudArrowUp} size={'2x'}/>
                        </button>
                        <button
                            type={'button'}
                            className="addButton buttonWiden"
                            onClick={onShare}
                            style={{
                                backgroundColor: !isPublic ? undefined : "#333",
                                color:!isPublic ? undefined : "white"
                            }}>
                            <FontAwesomeIcon icon={faMobileScreenButton} size={'2x'}/>
                        </button>
                    </div>
                </section>
                <section className={'modalContentSection flexVTContainer'}>
                    <h1 className={'sectionTitle'}>
                        {t('schemas:difficulty')}
                        <hr className='sectionHR'/>
                    </h1>
                    <select name='difficulty' className={'sectionSelectBox'}
                        onChange={
                            (event)=> setDifficulty(
                          event.target.value === Difficulty.easy ? Difficulty.easy :
                                event.target.value === Difficulty.medium ? Difficulty.medium :
                                Difficulty.hard
                            )
                    }>
                        <option value={Difficulty.easy}>{t('common:'+Difficulty.easy)}</option>
                        <option value={Difficulty.medium}>{t('common:'+Difficulty.medium)}</option>
                        <option value={Difficulty.hard}>{t('common:'+Difficulty.hard)}</option>
                    </select>
                </section>
                <div className={'modalContentSection'}>
                    <section className='modalTitleContainer'>
                        <div className='flexHZContainer modalHR'>
                            <h3 className='modalTitle'>
                                {t('schemas:exercises')}
                            </h3>
                            <button className='addButton' onClick={(e) => {
                                e.preventDefault()
                                addExercise()
                            }}>
                                <FontAwesomeIcon icon={faPlus} size={'1x'}/>
                            </button>
                        </div>
                        <hr className='modalHR'/>
                    </section>
                    <div className={'flexVTScrollContainer'}>
                        {exercises.map((item, index)  =>
                         <Fragment key={index}>
                                <div key={index} className={'itemContainer'}>
                                    <h1 className={'itemNumber'}>
                                        {index + 1}
                                    </h1>
                                    <div className={'modalItemContent'}>
                                        <div className={'modalItemSubContent'}>
                                            <input


                                                value={item.duration}
                                                type={'number'}
                                                className={'modalNumberInput'}
                                                onChange={(event) => editExerciseDuration(index, event.target.value)}
                                            />
                                            <h1 className='modalItemTitle'>
                                                {t('exercises:minutes')}
                                            </h1>
                                            <select name='difficulty'  className='sectionSelectBox'
                                                    onChange={
                                                        (event)=> editExerciseTitle(index, event.target.value)
                                                    }>
                                                <option> {t('exercises:walking')}</option>
                                                <option>{t('exercises:jogging')}</option>
                                                <option>{t('exercises:running')}</option>
                                                <option>{t('exercises:sprinting')}</option>
                                                <option className={'option'}>{t('exercises:pause')}</option>
                                            </select>

                                        </div>

                                    </div>
                                    <FontAwesomeIcon icon={faTrash} size={'lg'} style={{padding: 3}} onClick={() => removeExercise(index)}/>
                                    </div>
                                {index < exercises.length -1 ? <hr className={'itemHR'} /> : null}
                         </Fragment>
                            )}
                    </div>
                </div>
            </section>
            <div className={'modalButtonContainer'}>
                <button type={"submit"} className="addButton buttonWiden">
                    <FontAwesomeIcon icon={faCheck} size={'2x'}/>
                </button>
                <button type={"reset"} className="addButton buttonWiden">
                    <FontAwesomeIcon icon={faBan} size={'2x'}/>
                </button>
            </div>
        </form>
    )
}
