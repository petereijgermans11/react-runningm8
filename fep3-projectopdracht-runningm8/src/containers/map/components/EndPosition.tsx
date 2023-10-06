import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {Circle} from "react-leaflet";
import React from "react";

export function EndPosition({coords}: {coords?:[number, number]}) {
    const endLocation = useAppSelector(SessionSelectors.getEndLocation)
    if(endLocation?.coords || coords){
        return <Circle
            color={'rgba(255,125,255,1)'}
            fill={true}
            fillColor={'rgba(0,0,0,1)'}
            fillOpacity={1}
            center={coords ? coords as [number, number] :
                endLocation?.coords as [number, number]
            }
            radius={5}/>
    }else{
        return null
    }
}
