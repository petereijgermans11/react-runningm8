import React, {useEffect, useState} from 'react';

import {Difficulty, Exercise, TrainingSchema} from "../../store/schemas/schema.types";
import {useAppDispatch} from "../../store";
import {SchemaThunks} from "../../store/schemas";
import {
    faXmark,
    faCloudArrowUp,
    faPlus,
    faTrash,
    faCheck, faMobileScreenButton
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {EditSchema} from "../../store/schemas/schema.reducer";

export function EditSchemaModal({schema, index, toggleEdit}:{closeModal?: Function, schema: TrainingSchema, index:number, toggleEdit: Function}){
    const dispatch = useAppDispatch()
    const [exercises, setExercises] = useState<Array<Exercise>>([])
    const [title, setTitle] = useState('workout')
    const [isPublic, setIsPublic] = useState(false)
    const [difficulty, setDifficulty] = useState(Difficulty.easy)
    const [totalTime, setTotalTime] = useState(0)
    const { t } = useTranslation();
    useEffect(()=>{
        if(schema){
            setExercises([...schema.exercises])
            setTitle(schema.title as string)
            setIsPublic(schema.public as boolean)
            setTotalTime(schema.totalTime as number)
            setDifficulty(schema.difficulty as Difficulty)
        }
    },[ setExercises,
        setTitle,
        setIsPublic,
        setTotalTime,
        setDifficulty,schema])

    const addExercise = () => {
        setExercises(prevState => [...prevState, {
            duration: 0,
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
                let exercisex = {...exercise}
                exercisex.text = text
                exercisesCopy[exercisesCopy.indexOf(exercise)] = exercisex
            }
        }
        setExercises(exercisesCopy)
    }
    const editExerciseDuration = async (key:number, duration:string) => {
        const exercisesCopy = [...exercises]
        let totalTimex = 0
        for(let exercise of exercisesCopy){
            let exercisex = {...exercise}
            if(exercisesCopy.indexOf(exercise) === key){
                exercisex.duration = !isNaN(parseInt(duration)) ? parseInt(duration) : 0
                exercisesCopy[exercisesCopy.indexOf(exercise)] = exercisex
            }
            totalTimex += exercisex.duration
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
                let newschema:TrainingSchema = {
                    difficulty: difficulty,
                    exercises: exercises,
                    public: isPublic,
                    title: title,
                    totalTime: totalTime
                }
                let editschema: EditSchema = {
                    schema: newschema,
                    key: index
                }
                dispatch(SchemaThunks.editSchema(editschema))
                toggleEdit(false)
            }
        }

    }
    const onReset = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        toggleEdit(false)
    }
    const onDelete = () => {
        dispatch(SchemaThunks.deleteSchema(index))
    }
    return (
        <form className={'modalContainer'} onSubmit={onSubmit} onReset={onReset}>
            <section className={'modalTitleContainer'}>
                <div className={'flexVTContainer modalHR'}>
                     <div className={'modalButtonContainer'}>
                        <input value={title} placeholder='Title...'
                               name={'title'} type={'text'}
                               className={'modalTextInput'}
                               onChange={(event) => setTitle(event.target.value)}/>
                        <button type={"reset"} className="editButton" style={{padding: 10}}>
                            <FontAwesomeIcon icon={faXmark} size={'2x'}/>
                        </button>
                    </div>
                    <hr className={'modalHR'}/>
                </div>
            </section>
            <section className={'modalContentContainer'}>
                <section className={'modalContentSection flexVTContainer'}>
                    <h1 className='sectionTitle'>
                        {t('schemas:sharing')}
                        <hr className='sectionHR'/>
                    </h1>
                    <div className={'flexHZContainer modalButtonContainer'}>
                        <button type={'button'}
                                className="addButton buttonWiden"
                                onClick={()=>setIsPublic(true)}
                                style={{
                                    backgroundColor: isPublic ? undefined : "#333",
                                    color:isPublic ? undefined : "white"
                                }}>
                            <FontAwesomeIcon icon={faCloudArrowUp} size={'2x'}/>
                        </button>
                        <button type={'button'} className="addButton buttonWiden"
                                onClick={()=>setIsPublic(false)}
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
                            <React.Fragment  key={index}>
                                <div className={'itemContainer'}>
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
                                                {item.duration > 1 ? t('exercises:minutes') : t('exercises:minute') }
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
                                    <FontAwesomeIcon icon={faTrash} size={'lg'} style={{padding: 3}}
                                                     onClick={()=>removeExercise(index)}/>
                                </div>
                                {index < exercises.length -1 ? <hr className={'itemHR'} /> : null}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </section>
            <div className={'modalButtonContainer'}>
                <button type={"submit"} className="addButton buttonWiden">
                    <FontAwesomeIcon icon={faCheck} size={'2x'}/>
                </button>
                <button type={'button'} className="addButton buttonWiden" onClick={() => onDelete()}>
                    <FontAwesomeIcon icon={faTrash} size={'2x'}/>
                </button>
            </div>
        </form>
    )
}
