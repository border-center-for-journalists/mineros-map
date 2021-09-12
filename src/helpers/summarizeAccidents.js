const summarizeAccidents = data => {
  let events = data.default;
  let years = [];
  let totals = {
    accidents : 0,
    deaths : 0,
    ammount : 0,
  }
  for(let i = 2006; i <=2021;i++){
    years.push({
      year : i,
      accidents : 0,
      deaths : 0,
      ammount : 0
    });
  }
  for(let i = 0; i < events.length; i++){
    let index = events[i].year-2006;
    years[index].accidents++;
    years[index].deaths += events[i].deaths;
    years[index].ammount += events[i].ammount;
    totals.accidents++;
    totals.deaths += events[i].deaths;
    totals.ammount += events[i].ammount;
  }
  return {years,totals};
}

export default summarizeAccidents;