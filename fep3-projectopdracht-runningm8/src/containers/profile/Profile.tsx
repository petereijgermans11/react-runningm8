import React from "react";


import {useAppSelector} from "../../store";
import {UserSelectors} from "../../store/user";
import {Sync} from "./components/Sync";
import {Total} from "../analysis/components/Total";
import {Average} from "../analysis/components/Average";
import {Records} from "../analysis/components/Records";
import {Personal} from "./components/Personal";

export function Profile() {
    const selector = useAppSelector(UserSelectors.getUser)
    return (
        <div className={'screenContainer'}>
            {selector.email === undefined && selector.name === undefined ?
                <Sync />
                :
                null
            }
                <Personal />
                <Total />
                <Average />
                <Records />
        </div>
    );
}
