import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {Circle} from "react-leaflet";
import React from "react";

export function StartPosition({coords}: {coords?:[number, number]}) {
    const startLocation = useAppSelector(SessionSelectors.getStartLocation)
    if(startLocation?.coords || coords){
        return <Circle
            color={'rgba(255,125,255,1)'}
            fill={true}
            fillColor={'rgba(0,0,0,1)'}
            fillOpacity={1}
            center={coords ? coords as [number,number]:
                startLocation?.coords as [number,number]
            }
            radius={4}/>
    }else{
        return null
    }

}
