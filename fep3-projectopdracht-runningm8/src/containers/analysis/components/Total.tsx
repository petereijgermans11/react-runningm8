import React from "react";
import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {formatTimeToHumanText} from "../../../common/utilsFunctions";
import {StatisticsDisplay} from "../../profile/components/StatisticsDisplay";
import {useTranslation} from "react-i18next";

export function Total() {
    const totals = useAppSelector(SessionSelectors.getTotalProgress)
    const { t } = useTranslation();
    return (
        <StatisticsDisplay
            title={t('profile:titles:total')}
            data={  [
                {
                    title: t('common:Distance'),
                    value:totals.distance.toString().substring(0,5) + " km"
                        || t('profile:noDistance')
                },
                {
                    title: t('common:totalTime'),
                    value:formatTimeToHumanText(totals.time)
                        ||  t('profile:noTime')
                },
                {
                    title: t('common:averageSpeed'),
                    value:totals.speed.toString().substring(0,5) + " kmh"
                        || t('profile:noSpeed')
                },
                {
                    title: t('common:totalWorkoutTime'),
                    value:formatTimeToHumanText(totals.workoutTime)
                        ||  t('profile:noTime')
                },
                {
                    title: t('common:workouts'),
                    value:totals.workouts.toString()
                        || t('profile:noWorkouts')
                },
            ]} />
        )
}
