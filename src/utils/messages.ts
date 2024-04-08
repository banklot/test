// Defines the structure that comes back from proto.LoginResponse
export interface LoginResponse {
    token: string;
    status: string;
    user: object;
    ssoInfo: object;
    error: string;
}

export const translateError = (error: any) => {
    switch (error) {
        case 'events are not open':
            error = 'sorteos cerrados'
            break;
        case 'unable to create transaction due to insufficient funds':
            error = 'no tiene suficiente saldo'
            break;
    }
return error;
}