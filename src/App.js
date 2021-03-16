import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Galactic from './deck-1/galactic/galactic';
import Hazard from './deck-1/hazard/hazard';
import Iced from './deck-1/iced/iced';
import Carapace from './deck-1/carapace/carapace';
import Void from './deck-1/void/void';
import Flash from './deck-1/flash/flash';
import Corporate from './deck-1/corporate/corporate';
import Test from './deck-1/test/test';

function App() {
  return (
    <Router>
        <Switch>
            <Route path='/deck1/1'>
                <Galactic/>
            </Route>
            <Route path='/deck1/2'>
                <Hazard/>
            </Route>
            <Route path='/deck1/3'>
                <Iced/>
            </Route>
            <Route path='/deck1/4'>
                <Carapace/>
            </Route>
            <Route path='/deck1/5'>
                <Void/>
            </Route>
            <Route path='/deck1/6'>
                <Flash/>
            </Route>
            <Route path='/deck1/7'>
                <Corporate/>
            </Route>
            <Route path='/deck1/8'>
                <Test/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
