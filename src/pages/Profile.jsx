import { useEffect, useState } from 'react';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { selectUser, selectLogin } from '../Selectors/selector';
import { editUserService } from '../services/EditUserService';
import { userService } from '../services/UserService';
import { setFirstName, setLastName } from '../features/userReducer';

export default function Profile() {
    const store = useStore();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = selectLogin(store.getState()).token;
    const [editProfile, setEditor] = useState(false);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    // REGEX
    const regexFirst = /^[a-zA-Z]+[a-zA-Z-]?[a-zA-Z]+$/;
    const regexLast = /^[a-zA-Z]+[a-zA-Z'-]?[a-zA-Z]+$/;

    useEffect(() => {
        token && userService(store, token);
    }, [store, token]);

    const editNav = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (regexFirst.test(newFirstName) && newFirstName !== user.firstName) {
            dispatch(setFirstName(newFirstName));
        }
        if (regexLast.test(newLastName) && newLastName !== user.LastName) {
            dispatch(setLastName(newLastName));
        }
        editUserService(store, token);
        setEditor(false);
    };

    return (
        <>
            {user.user_status === 'resolved' && (
                <>
                    <main className="main bg-dark">
                        <div className="header">
                            {editProfile ? (
                                <>
                                    <h1>Welcome back</h1>
                                    <form onSubmit={editNav}>
                                        <div className="user-input">
                                            <input
                                                className="user-input-editor"
                                                type="text"
                                                id="username"
                                                placeholder={user.firstName}
                                                onChange={(e) =>
                                                    setNewFirstName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <input
                                                className="user-input-editor"
                                                type="text"
                                                id="lastname"
                                                placeholder={user.lastName}
                                                onChange={(e) =>
                                                    setNewLastName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="user-button">
                                            <button
                                                className="user-edit-button"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="user-edit-button"
                                                onClick={() => setEditor(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <h1>
                                        Welcome back
                                        <br />
                                        {user.firstName} {user.lastName}
                                    </h1>
                                    <button
                                        className="edit-button"
                                        onClick={() => setEditor(true)}
                                    >
                                        Edit Name
                                    </button>
                                </>
                            )}
                        </div>
                        <h2 className="sr-only">Accounts</h2>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">
                                    Argent Bank Checking (x8349)
                                </h3>
                                <p className="account-amount">$2,082.79</p>
                                <p className="account-amount-description">
                                    Available Balance
                                </p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">
                                    View transactions
                                </button>
                            </div>
                        </section>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">
                                    Argent Bank Savings (x6712)
                                </h3>
                                <p className="account-amount">$10,928.42</p>
                                <p className="account-amount-description">
                                    Available Balance
                                </p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">
                                    View transactions
                                </button>
                            </div>
                        </section>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">
                                    Argent Bank Credit Card (x8349)
                                </h3>
                                <p className="account-amount">$184.30</p>
                                <p className="account-amount-description">
                                    Current Balance
                                </p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">
                                    View transactions
                                </button>
                            </div>
                        </section>
                    </main>
                </>
            )}
        </>
    );
}
