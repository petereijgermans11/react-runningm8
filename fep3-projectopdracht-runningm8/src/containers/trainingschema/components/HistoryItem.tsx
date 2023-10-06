import React from "react";

import Modal from 'react-modal'
import {useTranslation} from "react-i18next";

import {ScreenModal} from "../../modals/ScreenModal";
import {HistoryModal} from "../../modals/HistoryModal";
import {StartPosition} from "../../map/components/StartPosition";
import {TakenRoute} from "../../map/components/TakenRoute";
import {EndPosition} from "../../map/components/EndPosition";
import {Map} from "../../map/components/Map";

import {TrainingSession} from "../../../store/session/session.types";
import {calcSessionDistance, formatTimeToHumanText} from "../../../common/utilsFunctions";
Modal.setAppElement('#root')


export function HistoryItem({session}: { session: TrainingSession }) {
    const { t } = useTranslation();
    return (
        <ScreenModal>
            <div className={'previewContainer'}>
                <Map classname={'previewMap'} locate={session}>
                    <StartPosition coords={session.startPosition?.coords}/>
                    <EndPosition coords={session.endPosition?.coords}/>
                    <TakenRoute recordedPositions={session.recordedPositions} />
                </Map>
                {/*as well as this*/}
                <div className={'historyContentContainer '}>
                    <div className={'previewSummary'}>
                        <div className='summaryLabel'>{t('common:Date')}</div>
                        <div className={'summaryLabel'}>{t('common:Distance')}</div>
                        <div className={'summaryLabel'}>{t('common:averageSpeed')}</div>
                    </div>
                    <div className={'previewSummary textRight'}>
                        <div className={'summaryValue'}>{new Date(session.startPosition?.timestamp as number).toDateString()}</div>

                        <div className={'summaryValue'}>{formatTimeToHumanText(session.totalTime as number)}</div>
                        <div className={'summaryValue'}>{calcSessionDistance({positions: session.recordedPositions}).toString().substring(0,5)}KM</div>
                    </div>
                </div>
            </div>
            <HistoryModal session={session}/>
        </ScreenModal>
    );
}
