import React, {useEffect} from "react";

import {useAppDispatch} from "../../store";
import {LocationThunks} from "../../store/location";

import {Map} from "./components/Map";
import {EndPosition} from "./components/EndPosition";
import {StartPosition} from "./components/StartPosition";
import {TakenRoute} from "./components/TakenRoute";
import {Session} from "./components/Session";
import {SessionControls} from "./components/SessionControls";
import {MyPosition} from "./components/MyPosition";


export const Run: React.FunctionComponent = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(LocationThunks.getCurrentLocation())
    }, [dispatch])
    return (
        <div className='screenContainer'>
            <div className={'mapContainer'}>
                <Map>
                    <StartPosition/>
                    <MyPosition />
                    <TakenRoute />
                    <EndPosition/>
                </Map>
                <Session />
                <SessionControls />
            </div>
        </div>
    )
}
