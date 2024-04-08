// import * as bcrypt from 'bcryptjs';
import moment from "moment-timezone";
// import {useUserStore} from "@/store/modules/user";
// import {useRegisterStore} from "@/store/modules/register";
// import CryptoJS from 'crypto-js';

export const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
}
export const formatDateInternational= (value) => {
    return moment(value).format('YYYY-MM-DD');
}
// export const addUserIcon = () => {
//     // Remove new user values from memory
//     useUserStore().setUser(null)
//     useRegisterStore().setRegisterStep(1);
//     useRegisterStore().setEmail(null);
//     useRegisterStore().setCity(null);
//     useRegisterStore().setBank(null);
//     useRegisterStore().setState(null);
//     useRegisterStore().setNationality(null);
//     useRegisterStore().setDocument(null);
//     useRegisterStore().setPhone(null);
//     useRegisterStore().setAddress(null);
//     useRegisterStore().setFirstname(null);
//     useRegisterStore().setSurname(null);
//     useRegisterStore().setPassword(null);
// }

export const getProductImage = (data) => {
    let product: string;
    switch (data.game_product_id) {
        case 1:
            product = "zamorano";
            break;
        case 2:
            product = "zulia";
            break;
        case 3:
            product = "tachira";
            break;
        case 4:
            product = "caliente";
            break;
        case 5:
            product = "caracas";
            break;
    }
    return `/images/products/${product}.png`;
}