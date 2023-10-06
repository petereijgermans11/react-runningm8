import React from "react";
import {useAppSelector} from "../../../store";

import {LocationSelectors} from "../../../store/location";
import {MapContainer, TileLayer} from "react-leaflet";
import {TrainingSession} from "../../../store/session/session.types";
import {LatLngTuple} from "leaflet";

export const Map: React.FunctionComponent<{classname?: string, children?: Array<React.ReactNode>, locate?: TrainingSession}>
    = ({children, classname, locate}) => {
    const currentLocation = useAppSelector(LocationSelectors.getCurrentLocation)
    return (
        locate !== undefined ?
                <MapContainer
                    className={classname}
                    bounds={locate && [locate.startPosition?.coords as LatLngTuple, locate.endPosition?.coords as LatLngTuple]}
                    zoom={20}
                    zoomControl={false}
                    dragging={false}
                    touchZoom={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    tap={false}
                    boxZoom={false}
                    maxBoundsViscosity={1}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {children}
                </MapContainer>
                :
                <MapContainer
                    center={currentLocation?.coords}
                    zoom={20}
                    zoomControl={false}
                    dragging={false}
                    touchZoom={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    tap={false}
                    boxZoom={false}
                    maxBoundsViscosity={1}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {children}
                </MapContainer>

    )
}
