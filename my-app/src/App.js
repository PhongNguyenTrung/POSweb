import React from "react";
import "./App.css";
import "./responsive.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Content from "./component/Home/Content";
import ProductContextProvider from "./Context/ProductContext";
import AuthContextProvider from "./Context/Auth";
import Header from "./component/Home/Header";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ProductContextProvider>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" component={Content} />
            </Switch>
          </div>
        </ProductContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
