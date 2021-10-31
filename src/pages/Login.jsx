import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch, useStore } from 'react-redux';
import { setEmail, setPassword } from '../features/login';
import { selectLogin } from '../Selectors/selector';
import { loginService } from '../services/LoginService';
import { Redirect } from 'react-router-dom';
//import { fetchLogin } from '../services/LoginService';

//import useFetchUser from '../services/UserSevice';

export default function Login() {
    const store = useStore();
    const dispatch = useDispatch();
    const login = useSelector(selectLogin);
    const [email, setFormEmail] = useState('');
    const [password, setFormPassword] = useState('');
    //const [toProfile, setToProfile] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!email || !password) {
            return;
        }
        //const token = fetchLogin(email, password);
        dispatch(setEmail(email));
        dispatch(setPassword(password));

        loginService(store);
        console.log(store.getState());
    };

    // const tokenLoaded = useSelector((state) => state.token);
    // if (tokenLoaded) {
    //     setToProfile(true);
    // }

    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setFormEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) =>
                                    setFormPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">Sign In</button>
                        {login.status === 'resolved' ? (
                            <Redirect
                                to={{
                                    pathname: `/profile`,
                                }}
                            />
                        ) : null}
                    </form>
                </section>
            </main>
        </>
    );
}
