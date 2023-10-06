import React from "react";
import {useTranslation} from "react-i18next";

export function NoItems() {
    const { t } = useTranslation();
    return (
        <div className={'noItemsContainer'}>
            <h2 className={'noItemsTitle'}>
                {t('schemas:noItems')}
            </h2>
        </div>
    );
}
