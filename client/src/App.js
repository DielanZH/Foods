import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import CreateRecipe from './views/CreateRecipe/CreateRecipe';
import Details from './views/DetailRecipe/Details';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path={'/'} component={Landing} />
          <Route path={'/home'} component={Home} />
          <Route path={'/createRecipe'} component={CreateRecipe} />
          <Route path={'/recipes/:id'} component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
