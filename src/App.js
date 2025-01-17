import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EncryptionForm from './components/EncryptionForm';
import Result from './components/Result';
import Crypter from "./components/crypter";
import Decrypter from './components/decrypter';

const App = () => (
  <Router>
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/encrypt" element={<EncryptionForm />} />
      <Route path="/result" element={<Result />} />
      <Route path="/cryptage" element={<Crypter />} />
      <Route path="/decrypter" element={<Decrypter />} />
    </Routes>
  </Router>
);

export default App;
