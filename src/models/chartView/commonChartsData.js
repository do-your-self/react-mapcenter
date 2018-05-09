import changeSkin from '../../../public/dasCharts/chart2.0/skin/skin';

export function commonChartsData(result, obj) {

  // console.log("RRRRRRRRRRRRRRRRRR11111",obj);
  // console.log("RRRRRRRRRRRRRRRRRR22222",result);
  let x = result.data.data.dimension;
  let y = result.data.data.metric;
  let isArrays = (y[0] instanceof Array);
  // if (isArrays == true) {
  // }
  // let max = Math.ceil(Math.max.apply(null, y));
  let serise = [];
  let yValue = {};
  let yNames = [];
  let xNames = [];
  for (let i = 0; i < y.length; i++) {
    let y1 = y[i];
    let ySeries = [];
    for (let j = 0; j < y1.length; j++) {
      yValue = {
        "name": x[j],
        "value": y1[j]
      };
      ySeries.push(yValue);
    }
    let serise1 = {
      name: obj.series[i].name,
      type: obj.series[i].type,
      data: ySeries
    };
    serise.push(serise1);
    xNames.push(obj.series[i].xAxisName);
    yNames.push(obj.series[i].yAxisName);
  }


  let option = {
    theme: obj.theme,//mobike
    name: obj.Name,
    style: obj.Style,//"barBaseStyle"
    xAxisNames: xNames,
    yAxisNames: yNames,
    series: serise,
    backgroundColor: "transparent",
  };


  //更换柱子颜色
  if (option.theme !== null) {
    changeSkin(option, option.theme);
  } else {
    return;
  }
  return option;
}
