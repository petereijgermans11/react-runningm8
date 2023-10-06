import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {Polyline} from "react-leaflet";
import React from "react";
import {UserPosition} from "../../../store/location/location.types";

export function TakenRoute({recordedPositions}: {recordedPositions?: Array<UserPosition>}) {
    const recordedRoute = useAppSelector(SessionSelectors.getRecordedLocations)
    let userPositions: Array<[number, number]> | undefined = [];
    let source = recordedRoute;
    if(recordedPositions){
        source = recordedPositions
    }
    for(let position of source){
        userPositions.push(position.coords)
    }
    const colourOptions = { color: 'red' }
    return recordedPositions ?
        <Polyline pathOptions={colourOptions} positions={userPositions} />
    :
        recordedRoute.length > 0 ? <Polyline pathOptions={colourOptions} positions={userPositions} />
    :
        null
}
