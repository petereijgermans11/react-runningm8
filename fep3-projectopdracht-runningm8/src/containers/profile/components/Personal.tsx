import React from "react";
import {useAppSelector} from "../../../store";
import {UserSelectors} from "../../../store/user";
import {StatisticsDisplay} from "./StatisticsDisplay";
import {useTranslation} from "react-i18next";

export function Personal() {
    const selector = useAppSelector(UserSelectors.getUser)
    const { t } = useTranslation();
    return (
    <StatisticsDisplay
        title={t('profile:titles:personal')}
        menu
        data={
            [
                {title: t('common:name'), value:selector.name || t('common:anonymous')},
                {title: t('common:email'), value:selector.email || t('common:noEmail')},
                {title: t('common:gender'), value:selector.gender as string},
                {title: t('common:height'), value:selector.height + " " + selector.heightUnit},
                {title: t('common:weight'), value:selector.weight + " " + selector.weightUnit},
            ]
        }
    >
        {selector.photoUrl ?
            <div className={'profileImageContainer'}>
                <img className={'profileImage'}
                     referrerPolicy={'no-referrer'}
                     src={
                        selector.photoUrl !== 'x' ? selector.photoUrl
                            :
                            'https://via.placeholder.com/50'
                     }
                     alt={'some text'}/>
            </div> : undefined}
    </StatisticsDisplay>
    );
}
