import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/weatherInformations/weatherInfo';
import WeatherInformations5days from './components/weather5days/weatherInfo';

function App() {
  const [weather, setWeather] = useState(null);
  const [weather5days, setWeather5days] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  const inputRef = useRef();

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  async function searchCity() {
    const city = inputRef.current.value.trim();
    
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError('');
    setWeather(null);
    setWeather5days(null);
    
    const key = "7c242d0b7f4e3f845444cc5b2df539a8";
    
    try {
      // Corrected URL for current weather
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=en&units=metric`;
      // URL for 5-day forecast
      const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=en&units=metric`;
      
      const apiInfo = await axios.get(url);
      const apiInfo5days = await axios.get(url5days);

      setWeather(apiInfo.data);
      setWeather5days(apiInfo5days.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCity();
    }
  };

  return (
    <div className='container'>
      <button 
        className="theme-toggle" 
        onClick={() => setDarkMode(!darkMode)} 
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      
      <h1>Weather Forecast</h1>
      
      <div className="search-container">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Enter city name" 
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchCity}>Search</button>
      </div>
      
      {loading && <div className="loading"></div>}
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="weather-display">
        {weather && <WeatherInformations weather={weather} />}
        {weather5days && <WeatherInformations5days weather5days={weather5days} />}
      </div>
    </div>
  )
}

export default App