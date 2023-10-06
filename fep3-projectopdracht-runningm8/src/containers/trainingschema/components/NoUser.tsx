import React from "react";
import {useTranslation} from "react-i18next";

export function NoUser() {
    const { t } = useTranslation();
    return (
        <div className={'noItemsContainer'}>
            <h2 className={'noItemsTitle'}>
                {t('schemas:login')}
            </h2>
        </div>
    );
}
