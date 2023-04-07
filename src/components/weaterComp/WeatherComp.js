import './weatherComp.scss';

const WeateherComp = (props) => {

   const weateherData = props.data.list;

   const toNoramlDate = (date) => {
      const presDay = date;
      const predDay = presDay.substring(8, 10);
      const predMonth = presDay.substring(5, 7);
      const predTime = presDay.substring(10, 16)
      return (
         <div>{predDay}.{predMonth} {predTime}</div>
      )
   }

   function sviper(e) {
      const container = document.querySelector('.weater-items');
      let start = 0;
      start = e.touches[0].clientX;
      container.addEventListener('touchmove', event => {
         let clientX = 0;
         clientX = event.changedTouches[0];
         let clientCoord = clientX.clientX
         let positionX = clientCoord - start;

         container.style.cssText = `transform: translateX(${positionX}px)`;
      })

   }

   function renderItem(weateherData) {
      const items = weateherData.map((item, i) => {
         return (
            <div key={i} className="weater-items__item">
               <div>{toNoramlDate(item.dt_txt)}</div>
               <div>
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weateher icon" />
               </div>
               <div>{item.weather[0].description}</div>
               <div>Температура: {Math.round(item.main.temp)} °C</div>
               <div>відчувається як: {Math.round(item.main.feels_like)} °C</div>
               <div>Вологість: {item.main.humidity} %</div>
               <div>Тиск: {item.main.pressure} гПк</div>
               <div className='weater-items__wind'>
                  {item.wind.speed} м/с
               </div>
            </div>
         )
      })

      return (
         <div className='weater-items__wraper'>
            <div className='weater-items' onTouchStart={(e) => sviper(e)}>
               {items}
            </div>
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