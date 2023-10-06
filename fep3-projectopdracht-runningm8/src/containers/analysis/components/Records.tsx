import React from "react";
import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {formatTimeToHumanText} from "../../../common/utilsFunctions";
import {StatisticsDisplay} from "../../profile/components/StatisticsDisplay";
import {useTranslation} from "react-i18next";

export function Records() {
    const records = useAppSelector(SessionSelectors.getRecordProgress)
    const { t } = useTranslation();

    return (
        <StatisticsDisplay
            title={t('profile:titles:records')}
            data={[
                {
                    title: t('common:Distance'),
                    value:records.distance.toString().substring(0,5) + " km"
                        || t('profile:noDistance')
                },
                {
                    title:  t('common:totalTime'),
                    value:formatTimeToHumanText(records.time)
                        || t('profile:noTime')
                },
                {
                    title: t('common:averageSpeed'),
                    value:records.speed.toString().substring(0,5) + " Kmh"
                        ||  t('profile:noSpeed')
                },
                {
                    title: t('common:totalWorkoutTime'),
                    value:formatTimeToHumanText(records.workoutTime)
                        ||  t('profile:noTime')
                },
                {
                    title: t('common:workouts'),
                    value:records.workouts.toString()
                        || t('profile:noWorkouts')
                },
            ]}/>

    );
}
