import { selectLogin } from '../Selectors/selector';

export const FETCHING = 'login/fetching';
export const RESOLVED = 'login/resolved';
export const REJECTED = 'login/rejected';

const loginFetching = (email, password) => ({
    type: FETCHING,
    payload: { email: email, password: password },
});
const loginResolved = (token) => ({ type: RESOLVED, payload: token });
const loginRejected = (error) => ({ type: REJECTED, payload: error });

export async function loginService(store) {
    const status = selectLogin(store.getState()).status;
    const email = selectLogin(store.getState()).email;
    const password = selectLogin(store.getState()).password;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(loginFetching());
    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const { body } = await response.json();
        store.dispatch(loginResolved(body.token));
    } catch (error) {
        store.dispatch(loginRejected(error));
    }
}