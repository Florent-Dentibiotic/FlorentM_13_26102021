import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import './index.css';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/sign-in">
                    <Login />
                </Route>
                <Route
                    exact
                    path="/profile"
                    render={(props) => <Profile {...props} />}
                />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
