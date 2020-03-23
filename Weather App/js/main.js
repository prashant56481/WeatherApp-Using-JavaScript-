//on loading the webpage
window.addEventListener("load",()=>
{
  if(navigator.geolocation)
  {
    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    var temperatureDegree=document.querySelector(".temperature-degree");
    var locationTimezone=document.querySelector(".location-timezone");
    let temperatureSection=document.querySelector(".temperature");
    const temperatureSpan=document.querySelector(".temperature span");
    let wind=document.querySelector(".Wind");
    console.log(wind);
    navigator.geolocation.getCurrentPosition(position=>
      {
      long=position.coords.longitude;
      lat=position.coords.latitude;
      //not quotes but no before 1
      //api doesnot allow request from local host
      //thus use proxt server
      const proxy="https://cors-anywhere.herokuapp.com/"
      const api=`${proxy}https://api.darksky.net/forecast/33115915518f89f0d5b4a6cdec99e924/${lat},${long}`;
      //when information is fetch then do my work
      fetch(api)
        .then(response=>
          {
          //now use JSON
          console.log(response);
          return response.json();
        })
        .then(data=>
          {
            const{temperature,summary,icon}=data.currently;
          console.log(data);
          //set DOM elements from the Comapatible
          temperatureDegree.textContent=temperature;
          locationTimezone.textContent=data.timezone;
          temperatureDescription.textContent=summary;
          wind.textContent+=data.currently.windSpeed;
          setIcons(icon,document.querySelector(".icon"));

          //formula for celcius
          let celcius=(temperature-32)*(5/9);
          //
          temperatureSection.addEventListener("click",()=>{
            if(temperatureSpan.textContent==='F'){
              temperatureSpan.textContent="°C";
              temperatureDegree.textContent=Math.floor(celcius);
            }
            else {
              temperatureSpan.textContent="F";
              temperatureDegree.textContent=temperature;
            }
          });
        });
        });

  }
function setIcons(icon,iconID){
  //read skycon code on github
  const skycons=new Skycons({color:"white"});
  const  currentIcon=icon.replace(/-/g,"_").toUpperCase();//replace - with _
  skycons.play();
  return skycons.set(iconID,Skycons[currentIcon]);
}
});
