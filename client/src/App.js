import './App.css';
import 'typeface-montserrat'
import 'fontsource-roboto';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from './Components/search';
import Detail from './Components/detail';

const NotFound = () => <div>Not found</div>

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/detail/:lotCode" component={Detail} />
              <Route component={NotFound} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
