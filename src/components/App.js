import React from 'react';
import './../App.css';
import Header from './Header';
import Footer from './Footer';
import MemoryControl from './MemoryControl';
import Signin from './Signin';
import Contact from './Contact';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/memorycontrol" component={MemoryControl} />
        <Route path="/signin" component={Signin} />
        <Route path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;