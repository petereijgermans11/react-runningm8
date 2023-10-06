import React from 'react';
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "../../store";
import {UserThunks} from "../../store/user";

import {useTranslation} from "react-i18next";

export function LogOutModal({closeModal}:{closeModal?: Function}) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    const cancel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(closeModal) closeModal()
    }
    const logout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(UserThunks.logout())

    }
    return (
        <form className="modalContainer" onSubmit={logout} onReset={cancel}>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle'>
                        {t('modals:logout:title')}
                    </h3>
                </div>
                <hr className='modalHR'/>
            </section>
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
