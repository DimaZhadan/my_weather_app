import { useState } from 'react'

import useApiServices from '../../services/ApiServices';
import WeateherComp from '../weaterComp/WeatherComp';
import Spinner from "../spinner/spinner";

import './mineWeather.scss';

const MineWeather = () => {
   const [cityName, setCityName] = useState('');
   const [cityArr, setCityArr] = useState([]);
   const [weather, setWeat] = useState([]);
   const [loading, setLoading] = useState(true);
   const [renderWEather, setRenderWEather] = useState(false);
   const [count, setCount] = useState(8);
   const [error, setError] = useState(false);

   const { getCitiCoordinates, getWeatherInfo } = useApiServices();

   const onCitySelect = (city) => {
      getCitiCoordinates(city)
         .then(cityArr => setCityArr(cityArr));
   }

   const getWeather = (item) => {
      setCityName(item.name)
      getWeatherInfo(item.lat, item.lon, count)
         .then(weather => setWeat(weather))
         .then(onWeatherLoading)
         .then(onRenderWeather)
         .catch(onError);
   }

   const onWeatherLoading = () => {
      setLoading(false);
   }

   const onRenderWeather = () => {
      setRenderWEather(true)
   }

   const onCountChange = (num) => {
      setRenderWEather(false);
      setLoading(true);
      setCount(num);
      onWeatherCountChange(num, weather);
   }


   const onWeatherCountChange = (count, weather) => {
      setLoading(false)
      setRenderWEather(true)
      getWeatherInfo(weather.city.coord.lat, weather.city.coord.lon, count)
         .then(weather => setWeat(weather))
         .catch(onError)
   }

   const onError = () => {
      setError(true)
   }

   function renderItem(arr) {
      const items = arr.map((item, i) => {
         if (item.country === 'ru') {
            return null
         } else {
            return (
               <button
                  key={i}
                  onClick={() => getWeather(item)}
                  className="weather__city-btn">
                  <span className='weather__city-descrition'>{item.country}, </span>
                  <span className='weather__city-descrition'>{item.name}, </span>
                  <span className='weather__city-descrition'>{item.state}</span>
               </button>
            )
         }
      })
      return (
         <>
            {items}
         </>
      )
   }
   const cities = renderItem(cityArr);
   const loader = loading ? <Spinner /> : null;
   const content = renderWEather ? <WeateherComp data={weather} /> : null;
   const defCity = cityName ? <span className='weather__city-name'> {cityName}</span> : <span className='weather__city-def'> Оберіть місто</span>;
   const errorMassege = error ? <div>Щось пішло нре так...</div> : null;

   return (
      <div className='weather'>
         <div className="container">
            <div className="weather__grid">
               <div className="data">
                  <div className='weather__city'>Погодні умови у місті: <label htmlFor='input-city'>{defCity}</label></div>
                  <div className='weather__input'>
                     <input
                        onInput={(e) => onCitySelect(e.target.value)}
                        placeholder="Введіть назву міста/селища"
                        className='weather__input-field'
                        id='input-city' />
                  </div>
                  <div className='weather__city-wrapper'>
                     {cities}
                     {errorMassege}
                  </div>
                  <div className="weather__count">
                     Оберіть період:
                     <div className='weather__count-wrapper'>
                        <button
                           onClick={() => onCountChange(16)}
                           className='weather__count-btn'>Дні: 2</button>
                        <button
                           onClick={() => onCountChange(24)}
                           className='weather__count-btn'>Дні: 3</button>
                        <button
                           onClick={() => onCountChange(40)}
                           className='weather__count-btn'>Днів: 5</button>
                     </div>
                  </div>
               </div>
               <div className="content">
                  {loader}
                  {content}
               </div>
            </div>
         </div>
      </div>
   )
}

export default MineWeather;