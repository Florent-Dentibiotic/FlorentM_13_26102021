import produce from 'immer';

// state
const userState = {
    firstName: null,
    lastName: null,
};

// actions creators

export const setFirstName = (firstName) => ({
    type: 'setFirstName',
    payload: { firstName: firstName },
});

export const setLastName = (lastName) => ({
    type: 'setLastName',
    payload: { lastName: lastName },
});

export default function userReducer(state = userState, action) {
    if (action.type === 'setFirstName') {
        const firstName = action.payload.firstName;
        return produce(state, (draft) => {
            draft.firstName = firstName;
        });
    }
    if (action.type === 'setLastName') {
        const lastName = action.payload.lastName;
        return produce(state, (draft) => {
            draft.lastName = lastName;
        });
    }
    return state;
}
