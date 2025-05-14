import React from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import Nav from './components/Nav';

function App() {
  return (
    <div className="app">
     <Nav />
     <HomeScreen />
    </div>
  );
}

export default App;
