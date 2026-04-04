import shellEn from './shell/en.json';
import shellEs from './shell/es.json';
import dashboardEn from './dashboard/en.json';
import dashboardEs from './dashboard/es.json';
import accountEn from './account/en.json';
import accountEs from './account/es.json';
export const translations = {
    en: {
        ...shellEn,
        ...dashboardEn,
        ...accountEn,
    },
    es: {
        ...shellEs,
        ...dashboardEs,
        ...accountEs,
    }
};
