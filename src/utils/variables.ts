export const translateTransactionType = (type: string) => {
    let result = type;
    switch (type) {
        case 'wager':
            result = "APUESTA";
            break;
        case 'prize':
            result = "PREMIO";
            break;
        case 'credit':
            result = "CREDITO";
            break;
        case 'debit':
            result = "DEBITO";
            break;
        case 'withdrawal':
            result = "RETIRO";
            break;
        case 'deposit':
            result = "DEPOSITO";
            break;
    }
    return result;
}

export const translateTransactionStatus = (code=null) => {
    let values = [
        {label: 'APROBADO', code: 'approved'},
        {label: 'PENDIENTE', code: 'pending'},
        {label: 'RECHAZADO', code: 'rejected'},
    ];
    if (code){
        values = values.filter(c => c.code === code)[0].label;
    }
    return values;
}


export const getGameProducts = () => {
    return {
        1: {
            name: "TRIPLE ZAMORANO",
            logo: "zamorano.png",
            color: "#F5AE04"
        },
        2: {
            name: "TRIPLE ZULIA",
            logo: "zulia.png",
            color: "#13257E"
        },
        3: {
            name: "TRIPLE TÁCHIRA",
            logo: "tachira.png",

        },
        4: {
            name: "TRIPLE CALIENTE",
            logo: "caliente.png",
            color: "red"
        },
        5: {
            name: "TRIPLE CARACAS",
            logo: "caracas.png",
            color: "#9A228B"
        },
        6: {
            name: "LA GRANJITA",
            logo: "granjita.png",
            color: "#0E5153"
        },
        7: {
            name: "JUNGLA MILLONARIA",
            logo: "jungla.png",
            color: "#22AF75"
        },
        8: {
            name: "SELVA PLUS",
            logo: "selva.png",
        },
    }
}
