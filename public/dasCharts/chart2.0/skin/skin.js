export default function changeSkin(dataOption, skinName) {
  if (dataOption.series == null || dataOption.series.length == 0) {
    return;
  }
  switch (skinName) {
    case "dianbanma":
      return dataOption.color = ["#FFC90E", "#05A8D1", "#D1D1D3", "#2EA2AA", "#2344FE", "#8672d5"];
      break;
    case "mobike":
      return dataOption.color = ["#FF5540", "#05A8D1", "#D1D1D3", "#2EA2AA", "#2344FE", "#8672d5"];
      break;
    case "xiangshu":
      return dataOption.color = ['#2463d5', '#94baf9', '#1d3c6a', '#dc4e41', '#221e1e', '#1da1f2',
          '#8672d5', '#d02e2a', '#ff5700'];
      break;
    case "dataojo":
      return dataOption.color = ["#30cfe7","#0c9dd7","#0b74d8","#003ab3","#3761bc","#6892ed","#87c9f2","#c0b8b0"];
      break;
    case "medical":
      return dataOption.color = ["#009389","#009389","#009389","#009389","#009389","#009389","#009389"];
      break;
    case "medicalLine":
      return dataOption.color = ["red","blue","#009389"];
      break;
    case "barStyle":
      return dataOption.color = ["#009389","#006493","#110364"];
      break;

    default:

  }
}
