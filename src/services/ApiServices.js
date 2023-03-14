

const useApiServices = () => {
   const _apiKey = '33e9bd7ed35b070d622767174ada772f';

   const getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   }

   const getCitiCoordinates = async (querry = 'rivne') => {

      const res = await getResource(`https://api.openweathermap.org/geo/1.0/direct?q=${querry}&limit=5&appid=${_apiKey}`);
      return res.map(transformCoord)
   }

   const getWeatherInfo = async (lat, lon, count) => {

      const data = await getResource(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${count}&appid=${_apiKey}&lang=uk&units=metric`);

      return data;
   }

   const transformCoord = (item) => {
      return {
         lat: item.lat,
         lon: item.lon,
         name: item.local_names ? item.local_names.uk : null,
         country: item.country,
         state: item.state
      }
   }

   return {
      getCitiCoordinates,
      getWeatherInfo
   }
}

export default useApiServices;