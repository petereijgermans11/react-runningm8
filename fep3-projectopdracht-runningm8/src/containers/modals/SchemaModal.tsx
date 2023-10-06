import React, {useState} from 'react';
import {TrainingSchema} from "../../store/schemas/schema.types";
import {EditSchemaModal} from "./EditSchemaModal";
import {formatTimeToHumanText} from "../../common/utilsFunctions";
import {useAppDispatch} from "../../store";
import {SessionThunks} from "../../store/session";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonRunning, faXmark, faPen} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

export function SchemaModal({closeModal, schema, index, mine}:{mine?:boolean, closeModal?: Function, schema: TrainingSchema, index:number}){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t} = useTranslation();
    const [edit, setEdit] = useState(false)
    if(edit){
        return <EditSchemaModal closeModal={closeModal} schema={schema} index={index} toggleEdit={setEdit}/>
    }
    const onRun = () => {
        dispatch(SessionThunks.setSchema(schema))
        navigate('/app/run')
        closeModal && closeModal()
    }
    return (
        <section className='modalContainer'>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle'>
                        {schema.title}
                    </h3>
                    <button className="editButton" onClick={()=> closeModal && closeModal()}><FontAwesomeIcon icon={faXmark} size={'2x'}/></button>
                </div>
                <hr className='modalHR'/>
            </section>
            <section className='modalContentContainer'>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('common:totalTime')}
                        <hr className='sectionHR'/>
                    </h1>
                    <h1 className='sectionValue'>
                        {schema.totalTime ? formatTimeToHumanText(schema.totalTime * 60000)
                            : '00:00:00'}
                    </h1>
                </div>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('schemas:difficulty')}
                        <hr className='sectionHR'/>
                    </h1>
                    <h1 className='sectionValue'>{t('common:'+schema.difficulty)}</h1>
                </div>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('schemas:sharing')}
                        <hr className='sectionHR'/>
                    </h1>
                    <h1 className='sectionValue'>
                        {schema.public ?
                            t('schemas:published') : t('schemas:private')}
                    </h1>
                </div>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('schemas:exercises')}
                        <hr className='sectionHR'/>
                    </h1>
                    <div className={'flexVTScrollContainer modalHR'}>
                        {schema.exercises.map((item, idx)=>
                            <React.Fragment key={idx}>
                                <div className='itemContainer'>
                                    <h1 className={'itemNumber'}>
                                        {idx + 1}
                                    </h1>

                                        <div className={'modalItemSubContent'}>
                                            <h1 className='modalItemValue padder'>{
                                                item.duration}
                                            </h1>
                                            <h1 className='modalItemValue'>
                                                {item.duration > 1 ?
                                                    t('exercises:minutes')
                                                    :
                                                    t('exercises:minute')
                                                }
                                            </h1>
                                            <h1 className='modalItemTitle padder'>
                                                {t('exercises:' + item.text)}
                                            </h1>
                                        </div>
                                </div>
                                {idx < schema.exercises.length -1 ?
                                    <hr className={'itemHR'} /> :
                                    null
                                }
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </section>
            <section className={'modalButtonContainer'}>
                 <button className="addButton buttonWiden" onClick={onRun}>
                     <FontAwesomeIcon icon={faPersonRunning} size={'2x'}/>
                 </button>
                {mine? <button className="addButton buttonWiden" onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faPen} size={'2x'}/>
                </button> : null}


            </section>
        </section>
    )
}
