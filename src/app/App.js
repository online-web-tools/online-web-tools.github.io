import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Container } from 'react-bootstrap';

import Settings from '../components/Settings';
import TopNavBar from '../components/TopNavBar';
import TwoFactorAuthenticator from '../components/TwoFactorAuthenticator';
import WhiteSpaceReplacer from '../components/WhiteSpaceReplacer';

import "./App.css";

function App() {
  return (
    <Container fluid>
      <Router>
        <TopNavBar title="Web Tools"/>
        <Routes>
          <Route path="/2fa" element={<TwoFactorAuthenticator />}></Route>
          <Route path="/space" element={<WhiteSpaceReplacer />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/" element={<h1>Welcome to Web Tools</h1>}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
