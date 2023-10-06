import React from 'react'
import {useAppDispatch, useAppSelector} from "../../../store";
import {SessionSelectors, SessionThunks} from "../../../store/session";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faTrash, faVolumeXmark, faVolumeHigh} from '@fortawesome/free-solid-svg-icons'
import {useTranslation} from "react-i18next";
import {AudioSelectors, AudioThunks} from "../../../store/audio";

export function MapSchemaContainer() {
     const selector = useAppSelector(SessionSelectors.getSchema)
     const audio = useAppSelector(AudioSelectors.getAudioMode)
     const dispatch = useAppDispatch()
     const { t } = useTranslation();
     const onPrev = async () => {
         dispatch(SessionThunks.prevExercise())
     }
     const onNext = async () => {
         dispatch(SessionThunks.nextExercise())
     }
     const onRemove = async () => {
         dispatch(SessionThunks.removeSchema())
     }
     const onSetAudio = () => {
         dispatch(AudioThunks.setSound())
     }
     return (
         selector !== undefined ?
             <div className='mapSchemaContainer'>
                 <button type={"button"} className={'addButton changeButton'} onClick={onSetAudio}>
                     {audio ? <FontAwesomeIcon icon={faVolumeHigh}/> : <FontAwesomeIcon icon={faVolumeXmark}/>}
                 </button>
                 <button type={"button"} className={'addButton changeButton'} onClick={onPrev}>
                     <FontAwesomeIcon icon={faCaretUp}/>
                 </button>
                 <h4 className={'textCenter exerciseText'}>{selector?.selectedExercise?.exercise.text ?t('exercises:' + selector?.selectedExercise?.exercise.text as string)  : t('common:noExercise')}</h4>
                 <button type={"button"} className={'addButton changeButton'} onClick={onNext}>
                     <FontAwesomeIcon icon={faCaretDown}/>
                 </button>
                 <button type={"button"} className={'addButton changeButton'} onClick={onRemove}>
                     <FontAwesomeIcon icon={faTrash}/>
                 </button>
             </div>

         :
             <button type={"button"} className={'addButton changeButton'} onClick={onSetAudio}>
                 {audio ? <FontAwesomeIcon icon={faVolumeHigh}/> : <FontAwesomeIcon icon={faVolumeXmark}/>}
             </button>

 )
}
