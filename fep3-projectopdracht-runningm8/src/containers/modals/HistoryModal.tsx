import React from 'react';
import {TrainingSession} from "../../store/session/session.types";

import {
    calcExerciseTime,
    calcSessionAverageSpeed,
    calcSessionDistance,
    formatTimeToHumanText
} from "../../common/utilsFunctions";
import {StartPosition} from "../map/components/StartPosition";

import {TakenRoute} from "../map/components/TakenRoute";
import {EndPosition} from "../map/components/EndPosition";
import {Map} from "../map/components/Map";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";

export function HistoryModal({closeModal, session}:{closeModal?: Function, session: TrainingSession}){
    const { t  } = useTranslation();
    return (
        <section className={'modalContainer'}>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle'>
                        {t('schemas:history:sessionDetails')}
                    </h3>
                </div>
                <hr className='modalHR'/>
            </section>
            <section className='modalContentContainer flexVTContainer'>
                <div className='modalContentSection  flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('schemas:history:takenRoute')}
                        <hr className='sectionHR'/>
                    </h1>
                    <Map classname={'modalMap'} locate={session}>
                        <StartPosition coords={session.startPosition?.coords}/>
                        <EndPosition coords={session.endPosition?.coords}/>
                        <TakenRoute recordedPositions={session.recordedPositions} />
                    </Map>
                </div>
                <section className='modalContentContainer flexVTScrollContainer'>
                <div className='flexVTContainer modalHR' >
                    <h1 className='sectionTitle'>
                        {t('schemas:history:timeDetails')}
                        <hr className='sectionHR'/>
                    </h1>
                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}>
                            {t('schemas:history:sessionDate')}
                        </h1>

                        <h1 className={'sectionValue'}>
                            {new Date(session.startPosition?.timestamp as number).toDateString() }
                        </h1>
                    </div>

                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}>
                            {t('schemas:history:sessionStart')}
                        </h1>
                        <h1 className={'sectionValue'}>
                            {formatTimeToHumanText(session.startPosition?.timestamp as number)}
                        </h1>
                    </div>
                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}>
                            {t('schemas:history:sessionEnd')}
                        </h1>
                        <h1 className={'sectionValue'}>
                            {formatTimeToHumanText(session.endPosition?.timestamp as number)}
                        </h1>
                    </div>

                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}> {t('common:totalTime')}</h1>
                        <h1 className={'sectionValue'}>{formatTimeToHumanText(session.totalTime as number)}</h1>
                    </div>


                </div>
                <div className='flexVTContainer modalHR'>
                        <h1 className='sectionTitle'>
                            {t('schemas:history:distanceDetails')}
                            <hr className='sectionHR'/>
                        </h1>

                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}>
                            {t('schemas:history:totalDistance')}
                        </h1>
                        <h1 className={'sectionValue'}>
                            {calcSessionDistance(
                                {positions:session.recordedPositions}
                                ).toString().substring(0,5)} KM
                        </h1>
                    </div>
                    <div className={'modalContentSection flexVTContainer'}>
                        <h1 className={'sectionTitle'}> {t('common:averageSpeed')}</h1>
                        <h1 className={'sectionValue'}>{
                            calcSessionAverageSpeed(
                                {positions:session.recordedPositions}
                                ).toString().substring(0,5)} Kmh
                        </h1>
                    </div>
                    </div>
                    <div className='flexVTContainer modalHR'>
                        <h1 className='sectionTitle'>
                            {t('schemas:history:workoutDetails')}
                            <hr className='sectionHR'/>
                        </h1>
                        <div className={'modalContentSection flexVTContainer'}>
                            <h1 className={'sectionTitle buttonWiden'}>
                                {t('schemas:history:exercisesDone')}
                            </h1>
                            <h1 className={'sectionValue'}>
                                {(session.schema && session.schema.exercisesDone.length) || 0}
                            </h1>
                        </div>
                        <div className={'modalContentSection flexVTContainer'}>
                            <h1 className={'sectionTitle  buttonWiden'}>
                                {t('schemas:history:exerciseTime')}
                            </h1>
                            <h1 className={'sectionValue'}>
                                {
                                    (session.schema &&
                                        formatTimeToHumanText(
                                            calcExerciseTime(session.schema.exercisesDone) as number * 60000
                                        )
                                    )
                                    || "00:00:00"
                                }
                            </h1>
                        </div>
                    </div>
                </section>
            </section>
            <section className={'modalButtonContainer'}>
                <button className={'addButton buttonWiden'}
                        onClick={() => closeModal && closeModal()}
                >
                    <FontAwesomeIcon icon={faXmark} size={'2x'}/>
                </button>
            </section>
        </section>
    )
}
