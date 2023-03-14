import { useState } from 'react'

import useApiServices from '../../services/ApiServices';
import WeateherComp from '../weaterComp/WeatherComp';
import Spinner from "../spinner/spinner";

const MineWeather = () => {
   const [city, setCity] = useState([]);
   const [cityArr, setCityArr] = useState([]);
   const [weat, setWeat] = useState([]);
   const [loading, setLoading] = useState(true);
   const [renderWEather, setRenderWEather] = useState(false)

   const { getCitiCoordinates, getWeatherInfo } = useApiServices();

   const cityC = (city) => {
      setCity(city);
      dveather(item);
   }

   const getCityInf = () => {
      getCitiCoordinates(city)
         .then(cityArr => setCityArr(cityArr));
   }

   const dveather = (item) => {
      getWeatherInfo(item.lat, item.lon)
         .then(weat => setWeat(weat))
         .then(onWeatherLoading)
         .then(onRenderWeather);
   }

   const onWeatherLoading = () => {
      setLoading(false)
   }

   const onRenderWeather = () => {
      setRenderWEather(true)
   }

   function renderItem(arr) {
      const items = arr.map((item, i) => {
         if (item.country === 'ru') {
            return null
         } else {
            return (
               <button key={i}>
                  <span onClick={() => dveather(item)}>{item.country}, </span>
                  <span onClick={() => dveather(item)}>{item.name}, </span>
                  <span onClick={() => dveather(item)}>{item.state}</span>
               </button>
            )
         }
      })
      return (
         <div className='fff'>
            {items}
         </div>
      )
   }

   const item = renderItem(cityArr);
   const loader = loading ? <Spinner /> : null;
   const content = renderWEather ? <WeateherComp data={weat} /> : null;

   return (
      <>
         <input onInput={(e) => cityC(e.target.value)} />
         <button onClick={() => getCityInf()}>getCityInfo</button>
         {item}
         {loader}
         {content}
      </>
   )
}

export default MineWeather;