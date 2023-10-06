import {useAppSelector} from "../../../store";
import {LocationSelectors} from "../../../store/location";
import {Circle, useMap} from "react-leaflet";
import React from "react";

export function MyPosition() {
    const myLocation = useAppSelector(LocationSelectors.getCurrentLocation)
    const map = useMap()

    if(myLocation?.coords){
        map.setView(myLocation.coords)
        return <Circle color={'green'} center={myLocation.coords as [number, number]} radius={10}/>
    }
    return null;
}
