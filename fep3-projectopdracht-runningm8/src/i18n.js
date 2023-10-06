import i18n from "i18next";
import {common_de, common_en, common_es, common_fr, common_it, common_nl} from "./translations";

i18n.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',
    // fallbackLng: 'en',// language to use
    resources: {
        en: common_en,
        de: common_de,
        fr: common_fr,
        es: common_es,
        it: common_it,
        nl: common_nl
    },
})
export default i18n
