import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const getLocaleResource = (requireContext: __WebpackModuleApi.RequireContext) => {
    return requireContext.keys().map(requireContext);
};
  
const localeResource = getLocaleResource(require.context("/public/data/", true, /\.(json)$/));
  
const resource: any = {
    en: {
        translations: {
        }
    },
    ko: {
        translations: {
        }
    }
}

const mergeLocaleResource = () => {
    const targetRes: any = [...localeResource];
    targetRes.forEach((res: { namespace: string; lng: string }) => {
        const namespace = res.namespace;
        if (res.lng === 'common') {
            for (var key in resource) {
                resource[key]['translations'][namespace] = res;
            }
        }
        else {
            resource[res.lng]['translations'][namespace] = res;
        }
    })
};
mergeLocaleResource();

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        // 초기 설정 언어
        lng: 'ko',
        fallbackLng: 'ko',
        debug: true,
        defaultNS: 'translations',
        ns: 'translations',
        returnObjects: true,
        keySeparator: 'very.deeply.nested',
        interpolation: {
            escapeValue: false
        }
    })
 
export default i18n;