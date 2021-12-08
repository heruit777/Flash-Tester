// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import Tester from './components/Tester';


function App() {
  return (
    <>
  <Navbar title="Flash Tester" aboutText="About Flash Tester" mode="light"/>
  <Tester />
    </>
  );
}

export default App;
