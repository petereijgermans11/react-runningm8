import React from "react";

import {calcSessionDistance} from "../../../common/utilsFunctions";
import {MapSchemaContainer} from "./MapSchemaContainer";

import {useAppSelector} from "../../../store";
import {StopwatchSelectors} from "../../../store/stopwatch";
import {LocationSelectors} from "../../../store/location";
import {SessionSelectors} from "../../../store/session";
import {useTranslation} from "react-i18next";
export function Session() {
    const timer = useAppSelector(StopwatchSelectors.getTime)
    const currentLocation = useAppSelector(LocationSelectors.getCurrentLocation)
    const recordedLocation = useAppSelector(SessionSelectors.getRecordedLocations)
    const { t  } = useTranslation();
    return (
        <div className='sessionContainer'>
            <div className='informationContainer'>
                <div className='detailsContainer'>
                    <div className='detail'>
                        <p className='label'>
                            {t('common:Speed')}
                        </p>
                        <h2 className='value'>
                            {
                            currentLocation?.speed.toString().substring(0, 5)
                            } KMH
                        </h2>
                    </div>
                    <div className='detail'>
                        <p className='label'>
                            {t('common:Distance')}
                        </p>
                        <h2 className='value'>{recordedLocation.length > 0 ?
                            calcSessionDistance({positions: recordedLocation}).toString().substring(0, 5)
                            : "0"}
                            km
                        </h2>
                    </div>
                    <div className='detail'>
                        <p className='label'>
                            {t('common:Altitude')}
                        </p>
                        <h2 className='value'>{currentLocation?.altitude ?
                            currentLocation.altitude.toString().substring(0, 5)
                            : 0}
                            M
                        </h2>
                    </div>
                </div>
            </div>
            <div className={'timeContainer'}>
                <div className='detail'>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <h1 className='value'>{("0" + Math.floor((timer/60000) % 60)).slice(-2)}:</h1>
                        <h1 className='value'>{("0" + Math.floor((timer/1000) % 60)).slice(-2)}:</h1>
                        <h1 className='value'>{("0" + Math.floor((timer/10) % 60)).slice(-2)}</h1>
                    </div>
                </div>
            </div>
            <MapSchemaContainer />
        </div>
    )
}
