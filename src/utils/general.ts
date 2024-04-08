// import * as bcrypt from 'bcryptjs';
import moment from "moment-timezone";
// import {useUserStore} from "@/store/modules/user";
// import {useRegisterStore} from "@/store/modules/register";
import app from "@/utils/app";

// export const formatDate = (value) => {
//     return moment(value, moment.ISO_8601).format("DD/MM/YYYY")
// }

export const formatDateStandard = (value) => {
    return moment(value).format('YYYY-MM-DD');
}

export const getTime = (data) => {
    return data ? moment(data.time, 'HH:mm:ss').format('h:mm A') : null;
}

export const getTodayDate = () => {
    return moment().tz("America/Caracas").format('YYYY-MM-DD');
}

export const getTodayDateFormatted = () => {
    return moment().tz("America/Caracas").format('DD/MM/YYYY');
}

export const getDaysAgoDate = (days: moment.DurationInputArg1) => {
    let startDate = moment().tz("America/Caracas");
    return startDate.subtract(days, 'd').format('YYYY-MM-DD');
}

export const getAreaCodes = () => {
    return [
        {"code": 412, "name": "0412"},
        {"code": 414, "name": "0414"},
        {"code": 424, "name": "0424"},
        {"code": 416, "name": "0416"},
        {"code": 426, "name": "0426"}
    ];
}

export const getEventNameAndTime = (event) => {
    let label: string;
    if (event.list)
        label = event.name + ' ' + event.list + ' ' + event.event_time
    else {
        label = event.name + ' ' + event.event_time
    }
    return label;
}

export const csvToArray = (csv) => {
    const rows = csv.split('\n');
    const result = [];

    for (const row of rows) {
        const values = row.split(',');
        values.forEach((item) => {
            result.push(item);
        })
    }
    return result;
}

export const formatCurrency = (amount: number) => {

    const res = new Intl.NumberFormat('es-VE').format(amount);
    // const fraction = new Intl.NumberFormat('es-VE', {
    //     style: 'currency',
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 0,
    // }).format(amount);
    return res;
}

export const logout = () => {
    console.trace("general.ts:logout called");
    app.session.logout();
}

export const removeItemFromArray = (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export const getPermutations = (string) => {
    let results = [];
    if (string.length === 1) {
        results.push(string);
        return results;
    }
    for (let i = 0; i < string.length; i++) {
        let firstChar = string[i];
        let otherChar = string.substring(0, i) + string.substring(i + 1);
        let otherPermutations = getPermutations(otherChar);

        for (let j = 0; j < otherPermutations.length; j++) {
            results.push(firstChar + otherPermutations[j]);
        }
    }
    return results;
}