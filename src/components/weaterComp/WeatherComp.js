

const WeateherComp = (props) => {

   const weateherData = props.data.list;

   function renderItem(weateherData) {
      const items = weateherData.map((item, i) => {
         return (
            <div key={i}>
               <div>{item.dt_txt}</div>
               <div>Температура: {Math.round(item.main.temp)} °C</div>
               <div>відчувається як: {Math.round(item.main.feels_like)} °C</div>
               <div>Вологість: {item.main.humidity} %</div>
               <div>Тиск: {item.main.pressure} гПк</div>
               <div>{item.weather[0].description}</div>
               <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
            </div>
         )
      })

      return (
         <div className='fff'>
            {items}
         </div>
      )
   }

   const item = renderItem(weateherData);

   return (
      <>
         {item}
      </>
   )
}

export default WeateherComp;