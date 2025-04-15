import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/weatherInformations/weatherInfo';

function App() {
  const [weather, setWeather] = useState()
  const inputRef = useRef();

  async function searchCity(){
    const city = inputRef.current.value;
    const key = "7c242d0b7f4e3f845444cc5b2df539a8"
    
    const url = `https://apihttps://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}}.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang=pt_br&units=metric`
    const apiInfo= await axios.get(url);
    setWeather(apiInfo.data);
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}

    </div>
  )
}

export default App
