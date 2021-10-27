import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toProfile, setToProfile] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!email || !password) {
            return;
        }
        setToProfile(true);
    };

    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">Sign In</button>
                        {toProfile ? (
                            <Redirect
                                to={{
                                    pathname: `/profile`,
                                    state: { email, password },
                                }}
                            />
                        ) : null}
                    </form>
                </section>
            </main>
        </>
    );
}
