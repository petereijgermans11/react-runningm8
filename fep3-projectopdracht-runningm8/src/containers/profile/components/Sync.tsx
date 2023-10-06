import React from "react";
import {useAppSelector} from "../../../store";
import {UserSelectors} from "../../../store/user";
import {ButtonModal} from "../../modals/ButtonModal";
import {LoginModal} from "../../modals/LoginModal";
import {RegisterModal} from "../../modals/RegisterModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {useTranslation} from "react-i18next";
export function Sync() {
    const selector = useAppSelector(UserSelectors.getUser)
    const { t } = useTranslation();
    return (
        selector.email === undefined && selector.name === undefined ?
                <section className={'statisticsContainer'}>
                    <div className={'statisticsTitleContainer'}>
                        <h1 className={'statisticsTitle'}>{t('profile:titles:profile')}</h1>
                        <hr className={'statisticsHR'}/>
                    </div>
                    <h4 className={'statisticsSubTitle'}>
                        {t('profile:subText')}
                    </h4>
                    <div className='logoContainer'>
                        <FontAwesomeIcon icon={faTwitter} size={'2x'} color={'rgb(125,180,255)'}/>
                        <FontAwesomeIcon icon={faGithub} size={'2x'} color={'rgb(255,255,255)'}/>
                        <FontAwesomeIcon icon={faGoogle} size={'2x'} color={'rgb(0,64,255)'}/>
                    </div>
                    <div className='modalButtonsContainer flexHZContainer buttonWiden'>
                        <ButtonModal text={t('buttons:login')} wider>
                            <LoginModal/>
                        </ButtonModal>
                        <ButtonModal text={t('buttons:register')} wider>
                            <RegisterModal />
                        </ButtonModal>
                    </div>
                </section>
            : null
    );
}
