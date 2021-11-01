import { useEffect } from 'react';
import { useStore, useSelector } from 'react-redux';
import { selectUser, selectLogin } from '../Selectors/selector';
import { userService } from '../services/UserService';

export default function Profile() {
    const store = useStore();
    const user = useSelector(selectUser);
    const token = selectLogin(store.getState()).token;

    useEffect(() => {
        token && userService(store, token);
    }, [store, token]);

    // {
    //     login.status === 'resolved' ?  : (
    //         <Redirect
    //             to={{
    //                 pathname: `/profile`,
    //             }}
    //         />
    //     )
    // }
    return (
        <>
            {user.user_status === 'resolved' && (
                <>
                    <main className="main bg-dark">
                        <div className="header">
                            <h1>
                                Welcome back
                                <br />
                                {user.firstName} {user.lastName}
                            </h1>

                            <button className="edit-button">Edit Name</button>
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
