// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { format } from "date-fns";
export default async (req, res) => {
  const result = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=18.477091&lon=73.890686&appid=a198074bd9ea971692c844b519765c8b&part=daily&units=metric`
  );

  const days = result.data.daily.splice(0, 5).map((day) => {
    return {
      icon: day.weather[0].main,
      desc: day.weather[0].description.replace(" intensity", ""),
      date: format(new Date(day.dt * 1000), "dd/MM"),
      date_full: format(new Date(day.dt * 1000), "dd MMMM, yyyy"),
      details: { humidity: day.humidity, rain: day.rain, wind: day.wind_speed },
      feels: {
        day: day.feels_like.day,
        night: day.feels_like.night,
        even: day.feels_like.eve,
        morn: day.feels_like.morn 
      },
      temp: {
        day: day.temp.day,
        night: day.temp.night,
        even: day.temp.eve,
        morn: day.temp.morn 
      },
    };
  });


  res.statusCode = 200;
  res.json({ days });
};
