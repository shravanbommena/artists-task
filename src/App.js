import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-transaction" component={AddTransaction} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
