import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx';
import Details from './components/Details/Details.jsx';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home/:id' component={Details}/>
        <Route path='/home' component={Home}/>
        <Route path='/recipe' component={CreateRecipe}/>
      </Switch>
    </div>
  );
}

export default App;
