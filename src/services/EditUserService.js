import { selectUser } from '../Selectors/selector';
import {
    USER_FETCHING,
    USER_RESOLVED,
    USER_REJECTED,
} from '../services/UserService';

// FETCHING ACTIONS
const userFetching = () => ({ type: USER_FETCHING });
const userResolved = () => ({ type: USER_RESOLVED });
const userRejected = (error) => ({ type: USER_REJECTED, payload: error });

export async function editUserService(store, token) {
    const status = selectUser(store.getState()).user_status;
    const firstName = selectUser(store.getState()).user.firstName;
    const lastName = selectUser(store.getState()).user.lastName;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(userFetching());
    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/profile',
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                }),
            }
        );
        await response.json();
        store.dispatch(userResolved());
    } catch (error) {
        console.log(error.message);
        store.dispatch(userRejected(error.message));
    }
}
