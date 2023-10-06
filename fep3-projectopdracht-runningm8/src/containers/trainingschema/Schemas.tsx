import React from "react";

import {SchemasItemContainer} from "./components/SchemasItemContainer";
import {SchemasTitleContainer} from "./components/SchemasTitleContainer";
import {SchemaItem} from "./components/SchemaItem";
import {NoItems} from "./components/NoItems";
import {HistoryItem} from "./components/HistoryItem";
import {useAppSelector} from "../../store";
import {SessionSelectors} from "../../store/session";
import {ButtonModal} from "../modals/ButtonModal";
import {AddSchemaModal} from "../modals/AddSchemaModal";
import {SchemaSelectors} from "../../store/schemas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {OthersItem} from "./components/OthersItem";
import {UserSelectors} from "../../store/user";
import {NoUser} from "./components/NoUser";
import {useTranslation} from "react-i18next";

export function Schemas() {
    const mySchemas = useAppSelector(SchemaSelectors.getAll)
    const user = useAppSelector(UserSelectors.getUser)
    const history = useAppSelector(SessionSelectors.getAllSessions)
    const { t } = useTranslation();
    return (
        <div className={'screenContainer screenWiden'}>
            <div className={'screenContentContainer screenWiden'}>
                <div className={'screenContentSection'}>
                    <div className={'sectionTitleContainer'}>
                        <div className={'flexHZContainer'}>
                            <h1 className={'screenSectionTitle'}>{t('schemas:my:title')}</h1>
                            <ButtonModal text={<FontAwesomeIcon icon={faPlus} size={'2x'}/>}>
                                <AddSchemaModal/>
                            </ButtonModal>
                        </div>
                        <hr className={'screenTitleHR'}/>
                    </div>

                    <SchemasItemContainer>
                        {mySchemas.mySchemas.length > 0 ? mySchemas.mySchemas.map(
                            (schema, index)=>
                                <SchemaItem key={index} index={index} schema={schema}/>)
                            :
                            <NoItems/>
                        }
                    </SchemasItemContainer>
                </div>
                <div className='screenContentSection'>
                    <SchemasTitleContainer title={t('schemas:others:title')}/>
                    <SchemasItemContainer>
                        {mySchemas.otherSchemas.length > 0 ? mySchemas.otherSchemas.map(
                            (schema,index)=>
                                <OthersItem key={index} schema={schema} index={index}/>)
                            :
                            user.email ?
                            <NoItems/> : <NoUser/>
                            // <SchemaItem key={1} schema={mySchemas.mySchemas[0] as TrainingSchema} index={1}/>
                        }
                    </SchemasItemContainer>
                </div>
                <div className={'screenContentSection'}>
                    <SchemasTitleContainer title={t('schemas:workouts:title')}/>
                    <SchemasItemContainer>

                        {history.length > 0 ? history.map(
                            (historyItem, index)=>
                                <HistoryItem key={index} session={historyItem}/>).reverse()
                            :
                            <NoItems/>
                        }
                    </SchemasItemContainer>
                </div>

            </div>

        </div>
    );
}
