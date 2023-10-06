import React from "react";
import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {
    formatTimeToHumanText
} from "../../../common/utilsFunctions";
import {StatisticsDisplay} from "../../profile/components/StatisticsDisplay";
import {useTranslation} from "react-i18next";

export function Average() {
    const averages = useAppSelector(SessionSelectors.getAverageProgress)
    const { t } = useTranslation();
    return (
        <StatisticsDisplay
            title={t('profile:titles:average')}
            data={
                [
                    {
                        title: t('common:Distance'),
                        value:averages.distance.toString().substring(0,5) + " km"
                            || t('profile:noDistance')
                    },
                    {
                        title: t('common:totalTime'),
                        value:formatTimeToHumanText(averages.time)
                            || t('profile:noTime')
                    },
                    {
                        title: t('common:averageSpeed'),
                        value:averages.speed.toString().substring(0,5) + ' kmh'
                            || t('profile:noSpeed')
                    },
                    {
                        title: t('common:totalWorkoutTime'),
                        value:formatTimeToHumanText(averages.workoutTime)
                            || t('profile:noTime')
                    },
                    {
                        title: t('common:workouts'),
                        value:averages.workouts.toString().substring(0,5)
                            || t('profile:noWorkouts')
                    },
                ]
            }/>
        );
}
