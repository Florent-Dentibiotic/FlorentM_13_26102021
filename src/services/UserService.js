import { setFirstName, setLastName } from '../features/userReducer';
import { selectUser } from '../Selectors/selector';

export const USER_FETCHING = 'user/fetching';
export const USER_RESOLVED = 'user/resolved';
export const USER_REJECTED = 'user/rejected';

// FETCHING ACTIONS
const userFetching = () => ({ type: USER_FETCHING });
const userResolved = () => ({ type: USER_RESOLVED });
const userRejected = (error) => ({ type: USER_REJECTED, payload: error });

export async function userService(store, token) {
    const status = selectUser(store.getState()).user_status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(userFetching());
    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/profile',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        console.log(json.body.firstName, json.body.lastName);
        store.dispatch(userResolved());
        store.dispatch(setFirstName(json.body.firstName));
        store.dispatch(setLastName(json.body.lastName));
    } catch (error) {
        console.log(error.message);
        store.dispatch(userRejected(error.message));
        store.dispatch(userResolved(null));
    }
}