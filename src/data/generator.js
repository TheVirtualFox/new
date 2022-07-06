import {firstNames, lastNames, companies} from './generatorDB';
export const generateTableDate = (length) => {
    return Array.from({length}, (_, i) => {
        const id = i + 1;
        const firstNamePos = Math.floor(Math.random() * firstNames.length);
        const lastNamesPos = Math.floor(Math.random() * lastNames.length);
        const companyPos = Math.floor(Math.random() * companies.length);
        const firstName = firstNames[firstNamePos];
        const lastName = firstNames[lastNamesPos];
        const email = `${firstName}${lastName}${id}@gmail.com`;
        const company = companies[companyPos];
        return {id, firstName, lastName, email, company};
    });
};