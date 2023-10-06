import React, { useState} from 'react';
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "../../store";
import {UserSelectors, UserThunks} from "../../store/user";
import {numberInputCheck} from "../../common/utilsFunctions";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {AppSelectors, AppThunks} from "../../store/app";

export function EditPersonalInfoModal({closeModal}:{closeModal?: Function}) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(UserSelectors.getUser)
    const language = useAppSelector(AppSelectors.getAppLanguage)
    const { t } = useTranslation();
    const [gender, setGender] = useState(user.gender)
    const [weight, setWeight] = useState(user.weight?.toString() as string)
    const [height, setHeight] = useState(user.height?.toString() as string)
    const [weightUnit, setWeightUnit] = useState(user.weightUnit)
    const [heightUnit, setHeightUnit] = useState(user.heightUnit)

    const cancel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(closeModal) closeModal()
    }
    const onConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(weight === '' || weight === '0'){
            toast.error('No correct weight input. Please check.')
        }else if(height === '' || height === '0'){
            toast.error('No correct height input. Please check.')
        }else{
            dispatch(UserThunks.setGender(gender as string))
            dispatch(UserThunks.setWeight(parseInt(numberInputCheck(weight)) ))
            dispatch(UserThunks.setWeightUnit(weightUnit as string))
            dispatch(UserThunks.setHeight(parseInt(numberInputCheck(height))))
            dispatch(UserThunks.setHeightUnit(heightUnit as string))
            dispatch(UserThunks.saveUser())
            if(closeModal) closeModal()
        }
    }
    const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(AppThunks.setLanguage(e.target.value))
    }
    return (
        <form className="modalContainer" onSubmit={onConfirm} onReset={cancel}>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle'>
                        {t('modals:edit:title')}
                    </h3>
                </div>
                <hr className='modalHR'/>
            </section>
            <div className='modalContentContainer flexVTContainer'>
                <div className='flexVTContainer'>
                    <div className='modalContentSection flexVTContainer'>
                        <h1 className='sectionTitle'>
                            {t('common:language')}
                            <hr className='sectionHR'/>
                        </h1>
                        <select name='language' value={language} onChange={(e) => onLanguageChange(e)} className='sectionSelectBox addButton buttonWiden'>
                            <option value={'en'} className='option addButton'>English</option>
                            <option value={'nl'} className={'option addButton'}>Nederlands</option>
                            <option value={'it'} className={'option addButton'}>Italiano</option>
                            <option value={'es'} className={'option addButton'}>Español</option>
                            <option value={'de'} className={'option addButton'}>Deutsch</option>
                            <option value={'fr'} className={'option addButton optionEnd'}>Français</option>
                        </select>
                    </div>
                    <div className='modalContentSection flexVTContainer'>
                        <h1 className='sectionTitle'>
                            {t('common:gender')}
                            <hr className='sectionHR'/>
                        </h1>
                        <div className='modalButtonContainer'>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: gender === 'Male' ? undefined : '#333'}}
                                    onClick={() => setGender('Male')}>
                                {t('common:male')}
                            </button>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: gender !== 'Male' ? undefined : '#333'}}
                                    onClick={() => setGender('Female')}>
                                {t('common:female')}
                            </button>
                        </div>
                    </div>
                    <div className='modalContentSection flexVTContainer'>
                        <h1 className='sectionTitle'>
                            {t('common:height')}
                            <hr className='sectionHR'/>
                        </h1>
                        <input className={'modalTextInput textCenter'} autoComplete={'current-password'} value={height} type={'number'} onChange={(event) => setHeight(event.target.value)}/>
                        <h1 className='sectionTitle'>
                            {t('common:heightUnit')}
                            <hr className='sectionHR'/>
                        </h1>
                        <div className={'modalButtonContainer'}>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: heightUnit === 'cm' ? undefined : '#333'}}
                                    onClick={() => setHeightUnit('cm')}>
                                cm
                            </button>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: heightUnit !== 'cm' ? undefined : '#333'}}
                                    onClick={() => setHeightUnit('inch')}>
                                {t('common:inch')}
                            </button>
                        </div>
                    </div>
                    <div className='modalContentSection flexVTContainer'>
                        <h1 className='sectionTitle'>
                            {t('common:weight')}
                            <hr className='sectionHR'/>
                        </h1>
                        <input className={'modalTextInput textCenter'} autoComplete={'current-password'} value={weight} type={'number'} onChange={(event) => setWeight(event.target.value)}/>
                        <h1 className='sectionTitle'>
                            {t('common:weightUnit')}
                            <hr className='sectionHR'/>
                        </h1>
                        <div className={'modalButtonContainer'}>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: weightUnit === 'kg' ? undefined : '#333'}}
                                    onClick={() => setWeightUnit('kg')}>
                                kg
                            </button>
                            <button className={'addButton buttonWiden'} type={'button'}
                                    style={{backgroundColor: weightUnit !== 'kg' ? undefined : '#333'}}
                                    onClick={() => setWeightUnit('lbs')}>
                                {t('common:lbs')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modalButtonContainer">
                <button className="addButton buttonWiden" type={"submit"}>
                    <FontAwesomeIcon icon={faCheck} size={'2x'}/>
                </button>
                <button className="addButton buttonWiden" type={"reset"}>
                    <FontAwesomeIcon icon={faBan} size={'2x'}/>
                </button>
            </div>
        </form>
    );
}
