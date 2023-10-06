import {useAppDispatch, useAppSelector} from "../../../store";

import {SessionSelectors, SessionThunks} from "../../../store/session";
import React from "react";
import {useTranslation} from "react-i18next";
import {AudioThunks} from "../../../store/audio";

export function SessionControls() {
    const recording = useAppSelector(SessionSelectors.getRecordingStatus)
    const paused = useAppSelector(SessionSelectors.getPausedStatus)
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    async function start() {
        dispatch(AudioThunks.playTimer())

    }
    async function pauseFunction() {
        dispatch(SessionThunks.pauseSession())
    }
    async function resume(){
        dispatch(SessionThunks.resumeSession())
    }
    async function stop(){
        dispatch(SessionThunks.stopSession())
    }
    async function askStop() {
        let result = window.confirm("Do you want to stop the workout?");
        if(result){
            return stop();
        }
    }

    return (
        <div className='sessionControlContainer'>
            {!recording ?
                <button
                    className='addButton changeButton'
                    onClick={start}
                >
                    {t('buttons:start')}
                </button>
                :
                paused?
                <div style={{
                    height: '100%',
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <button
                        className='addButton changeButton'
                        onClick={resume }
                    >
                        {t('buttons:resume')}
                    </button>
                    <button
                        className='addButton changeButton'
                        onClick={askStop}
                    >
                        {t('buttons:stop')}
                    </button>
                </div> :

                        <button
                            className='addButton changeButton'
                            onClick={pauseFunction}
                        >
                            {t('buttons:pause')}
                        </button>
            }
        </div>


    )
}

