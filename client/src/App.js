import Home from "./components/Home";
import Nav from "./components/nav/Nav";
import CreatePlan from "./containers/map/CreatePlan";
import ViewPlans from "./containers/map/ViewPlans";
import Test from "./components/map/Test";
import Live from "./components/Live";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
function App() {
  return <Router>
    <Nav/>
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/view-plan">
          <ViewPlans />
        </Route>
        <Route exact path="/create-plan">
          <CreatePlan />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/live">
          <Live />
        </Route>
    </Switch>
  </Router>
}

export default App;
