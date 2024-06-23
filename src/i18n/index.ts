import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./pt.json";

const resources = {
	pt: { translation: pt },
};

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	resources,
});

export default i18n;
