import ArgentBankLogo from '../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin, selectUser } from '../Selectors/selector';
import { Log_out } from '../features/loginReducer';

export default function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const login = useSelector(selectLogin);

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {login.status === 'resolved' ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>{' '}
                            {user.firstName}
                        </Link>
                        <Link
                            className="main-nav-item"
                            to="/"
                            onClick={() => dispatch(Log_out())}
                        >
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
