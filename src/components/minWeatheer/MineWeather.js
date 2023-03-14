import { useState } from 'react'

import useApiServices from '../../services/ApiServices';
import WeateherComp from '../weaterComp/WeatherComp';
import Spinner from "../spinner/spinner";

const MineWeather = () => {
   const [city, setCity] = useState([]);
   const [cityArr, setCityArr] = useState([]);
   const [weat, setWeat] = useState([]);
   const [loading, setLoading] = useState(true);
   const [renderWEather, setRenderWEather] = useState(false);
   const [count, setCount] = useState(8);

   const { getCitiCoordinates, getWeatherInfo } = useApiServices();

   const cityC = (city) => {
      setCity(city);
      getCitiCoordinates(city)
      .then(cityArr => setCityArr(cityArr));
      dveather(item);
   }

   const getCityInf = () => {

   }

   const dveather = (item) => {
      getWeatherInfo(item.lat, item.lon, count)
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
   
   const onCountChange = (num) => {
      setCount(num)
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
         <button onClick={()=> onCountChange(16)}>Днів: 2</button>
         <button onClick={()=> onCountChange(24)}>Днів: 3</button>
         <button onClick={()=> onCountChange(40)}>Днів: 5</button>
         {item}
         {loader}
         {content}
      </>
   )
}

export default MineWeather;