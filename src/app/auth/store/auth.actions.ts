export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccess {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date,
        redirect: boolean
    }) {}
}

export class Logout {
    readonly type = LOGOUT;
}

export class LoginStart {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class SignupStart {
    readonly type = SIGNUP_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class AutoLogin {
    readonly type = AUTO_LOGIN;
}

export class AuthenticateFail {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}

export type AuthActions =
| AuthenticateSuccess
| Logout
| LoginStart
| SignupStart
| AutoLogin
| AuthenticateFail;
