import React from 'react';
import logo from '../logo.svg';
import Dataset from './datalist';
import '../App.css';

function FirstPage() {
  const districts = [
    'Cuddalore',
    'Chennai', 
    'Kanchipuram',
    'Villupuram',
    'Theni',
    'Covai'
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Tamil Nadu</h1>
        <p className="App-description">
          Explore the beautiful districts of Tamil Nadu, each with its own unique culture, 
          heritage, and attractions. Discover the rich history and vibrant traditions 
          that make this state truly special.
        </p>
      </header>
      
      <main className="App-main">
        <h2>Our Districts</h2>
        <div className="districts-container">
          {districts.map((district, index) => (
            <div key={index} className="district-box">
              <h3>{district}</h3>
            </div>
          ))}
        </div>
      </main>
      <Dataset />
    </div>
  );
}

export default FirstPage;
