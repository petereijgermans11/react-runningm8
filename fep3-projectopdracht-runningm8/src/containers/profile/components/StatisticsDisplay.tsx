import React from "react";
import {DetailLine} from "./DetailLine";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import {ScreenModal} from "../../modals/ScreenModal";
import {LogOutModal} from "../../modals/LogOutModal";
import {EditPersonalInfoModal} from "../../modals/EditPersonalInfoModal";

import {WipeDataModal} from "../../modals/WipeDataModal";
import {useTranslation} from "react-i18next";
export type StatisticsProps = {
    title: string,
    data: Array<{title:string, value: string}>
    children?: React.ReactElement,
    menu?: boolean
}
// this component serves to display the values collected through the sessions.
// it holds no logic other than the mapping and props display
export const StatisticsDisplay:React.FunctionComponent<StatisticsProps> =
    ({title, data, children, menu}) =>{
        const { t } = useTranslation();
    return (
        <section className={'statisticsContainer'}>
            <section className={'statisticsTitleContainer'}>
                {menu ?
                    <div className="flexHZContainer screenWiden">
                        <h1 className='statisticsTitle screenWiden textCenter'>
                            {title}
                        </h1>
                        <div className={'dropdown relative'}>
                            <button className={'optionsButton'}>
                                <FontAwesomeIcon icon={faEllipsisVertical} size={'2x'} />
                            </button>
                            <div className='dropdownContent'>
                                <ScreenModal>
                                    <button className='addButton buttonWiden'>
                                        {t('buttons:edit')}
                                    </button>
                                    <EditPersonalInfoModal />
                                </ScreenModal>
                                {children ?
                                    <ScreenModal>
                                        <button className='addButton buttonWiden'>
                                            {t('buttons:logout')}
                                        </button>
                                        <LogOutModal />
                                    </ScreenModal>
                                    : null
                                }
                                <ScreenModal>
                                    <button className='addButton buttonWiden'>
                                        {t('buttons:wipeData')}
                                    </button>
                                    <WipeDataModal />
                                </ScreenModal>
                            </div>
                        </div>
                    </div> :
                <h1 className={'statisticsTitle'}>
                    {title}
                </h1>
                }
                <hr className={'statisticsHR'}/>
            </section>
            {children}
            <section className={'statisticsDetailsContainer'}>
                {data.map(
                    (item, index) =>
                        <DetailLine key={index} title={item.title} value={item.value}/>
                )}
            </section>
        </section>

    );
}
