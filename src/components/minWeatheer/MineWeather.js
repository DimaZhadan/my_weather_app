import { useState } from 'react'

import useApiServices from '../../services/ApiServices';
import WeateherComp from '../weaterComp/WeatherComp';
import Spinner from "../spinner/spinner";

const MineWeather = () => {
   const [cityName, setCityName] = useState('');
   const [cityArr, setCityArr] = useState([]);
   const [weat, setWeat] = useState([]);
   const [loading, setLoading] = useState(true);
   const [renderWEather, setRenderWEather] = useState(false);
   const [count, setCount] = useState(8);

   const { getCitiCoordinates, getWeatherInfo } = useApiServices();

   const cityC = (city) => {
      getCitiCoordinates(city)
         .then(cityArr => setCityArr(cityArr));
   }

   const dveather = (item) => {
      setCityName(item.name)
      getWeatherInfo(item.lat, item.lon, count)
         .then(weat => setWeat(weat))
         .then(onWeatherLoading)
         .then(onRenderWeather);
   }

   const onWeatherLoading = () => {
      setLoading(false);
   }

   const onRenderWeather = () => {
      setRenderWEather(true)
   }

   console.log(weat)

   const onCountChange = (num) => {
      setCount(num);
      onWeatherCountChange(num, weat)
   }


   const onWeatherCountChange = (count, weat) => {
      getWeatherInfo(weat.city.coord.lat, weat.city.coord.lon, count)
         .then(weat => setWeat(weat));
   }

   function renderItem(arr) {
      const items = arr.map((item, i) => {
         if (item.country === 'ru') {
            return null
         } else {
            return (
               <button
                  key={i}
                  onClick={() => dveather(item)}>
                  <span>{item.country}, </span>
                  <span>{item.name}, </span>
                  <span>{item.state}</span>
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
   const defCity = <div>{cityName}</div>;

   return (
      <>
         <input onInput={(e) => cityC(e.target.value)} placeholder="Введіть назву міста/селища"/>
         {item}
         <button onClick={() => onCountChange(16, weat)}>Дні: 2</button>
         <button onClick={() => onCountChange(24, weat)}>Дні: 3</button>
         <button onClick={() => onCountChange(40, weat)}>Днів: 5</button>
         {loader}
         {defCity}
         {content}
      </>
   )
}

export default MineWeather;