import { BrowserRouter, Route, Switch } from "react-router-dom";

// Auth files
import Login from './components/auth/login';
import SignUp from './components/auth/signUp';
import Callback from './components/auth/callback';

// Main files
import Dashboard from './components/main/dashboard';
import Profile from './components/main/profile';
import HireCar from './components/main/hireCar';
import ListCar from './components/main/listCar';
import Stats from './components/main/stats';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/callback" component={Callback}/>
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/hire-car" component={HireCar} />
        <Route path="/list-car" component={ListCar} />
        <Route path="/stats" component={Stats} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;