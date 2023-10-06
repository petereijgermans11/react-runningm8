import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import i18next from '../../i18n'
import {AudioStorageActions} from "./audio.reducer";
import {SessionThunks} from "../session";

const AudioThunks = {
    playSound: createAsyncThunk<void,string,AsyncThunkOptions>(
        'audio/speak', async (_, {getState, extra}) => {
            if(getState().audio.audioOn){
                let msg = new SpeechSynthesisUtterance()
                msg.lang =  i18next.language
                msg.text = i18next.t(_);

                if(window.speechSynthesis.speaking){
                    window.speechSynthesis.cancel()
                }

                window.speechSynthesis.speak(msg);
            }
        }
    ),
    playExercise: createAsyncThunk<void,void,AsyncThunkOptions>(
        'audio/speak', async (_, {getState, extra}) => {
            if(getState().audio.audioOn){
                let synth = window.speechSynthesis
                if(synth.speaking){
                    synth.cancel()
                }
                let msg = new SpeechSynthesisUtterance()
                msg.lang =  i18next.language

                msg.text = i18next.t('exercises:next')

                await synth.speak(msg);
            }
        }
    ),
    playNextExercise: createAsyncThunk<void,Array<string>,AsyncThunkOptions>(
        'audio/speak', async (_, {getState, extra}) => {
            if(getState().audio.audioOn){
                let synth = window.speechSynthesis

                let msg = new SpeechSynthesisUtterance()
                msg.lang = i18next.language
                let txt = _[0] + ' ' + i18next.t(_[1]) + ' ' + i18next.t(_[2])
                msg.text = txt

                await synth.speak(msg);
            }
        }
    ),
    setSound: createAsyncThunk<void,void,AsyncThunkOptions>(
        'audio/speak', async (_, {dispatch, getState}) => {
            dispatch(AudioStorageActions.setAudio())
            if(getState().audio.audioOn){
                dispatch(AudioThunks.playSound('ping!!!!'))
            }
        }
    ),
    playTimer: createAsyncThunk<void,void,AsyncThunkOptions>(
        'audio/speak', async (_, {getState, dispatch}) => {
            if(getState().audio.audioOn){
                let msg3 = new SpeechSynthesisUtterance()
                msg3.lang =  i18next.language
                msg3.text = '3'
                let msg2 = new SpeechSynthesisUtterance()
                msg2.lang =  i18next.language
                msg2.text = '2'
                let msg1 = new SpeechSynthesisUtterance()

                msg1.lang =  i18next.language
                msg1.text = '1'

                msg1.onend = () => dispatch(SessionThunks.startSession())

                window.speechSynthesis.speak(msg3)
                window.speechSynthesis.speak(msg2)
                window.speechSynthesis.speak(msg1)

                ;
            }
        }
    ),
};

export {AudioThunks};
