import echarts from 'echarts';

import barBaseStyle from "../../../public/dasCharts/chart2.0/style/dark/bar/barBaseStyle";
import barStackBaseStyle from "../../../public/dasCharts/chart2.0/style/dark/bar/barStackBaseStyle";
import barLineMixStyle from "../../../public/dasCharts/chart2.0/style/dark/bar/barLineMixStyle";
import rowBaseStyle from "../../../public/dasCharts/chart2.0/style/dark/bar/rowBaseStyle";
import barPyramidStyle from "../../../public/dasCharts/chart2.0/style/dark/bar/barPyramidStyle";


import lineBaseStyle from "../../../public/dasCharts/chart2.0/style/dark/line/lineBaseStyle";
import lineAreaStyle from "../../../public/dasCharts/chart2.0/style/dark/line/lineAreaStyle";
import MedicalLineStyle from "../../../public/dasCharts/chart2.0/style/dark/Medical/MedicalLineStyle";

import pieBaseStyle from "../../../public/dasCharts/chart2.0/style/dark/pie/pieBaseStyle";
import pieSectorStyle from "../../../public/dasCharts/chart2.0/style/dark/pie/pieSectorStyle";
import pieRingStyle from "../../../public/dasCharts/chart2.0/style/dark/pie/pieRingStyle";



//构造的数据格式
import {
  commonChartsData
} from './commonChartsData';

import {
  pieChartsData
} from './pieEntity';

let arrayChartState = [];
export let arr = [];

export function initChartView(divId, result, obj) {
  console.log("TTTTTTTTTTTTTccc", result, divId, obj);
  if (!result.data.result) {
    console.log(result.data.error, obj)
    return;
  }
  var backgroundColor, opacity, nameStyle;
  if (obj.hasOwnProperty("ChartStyle")) {
    backgroundColor = obj.ChartStyle.backgroundStyle.backgroundColor;
    opacity = Number(obj.ChartStyle.backgroundStyle.opacity) / 100;
    nameStyle = obj.ChartStyle.nameStyle;
  } else {
    backgroundColor = "black";
    opacity = 1;
    nameStyle = {
      "fontsize": 13,
      "fontcolor": "#ffffff",
      "fontfamily": "Microsoft Yahei"
    }
  }
  var selectStyle = obj.Style;
  var type = null;
  if (obj.hasOwnProperty("Type")) {
    type = obj.Type;
  }
  var fontsize = nameStyle.fontsize + "px";
  var fontcolor = nameStyle.fontcolor;
  var fontfamily = nameStyle.fontfamily;


  var tt = document.getElementById(divId);
  //当div下还存在子节点时
  while (tt.hasChildNodes()) {
    tt.removeChild(tt.firstChild);
  }

  if(obj.labelData){
      var backView = document.createElement("div");
      backView.id = divId + "Background";
      backView.style.cssText = "position:absolute;width:100%;height:100%;background:" + backgroundColor + ";opacity:" + opacity;
      var titleView = document.createElement("div");
      var titleDiv = document.createElement("div");
      titleView.id = divId + "Title";
      titleView.style.cssText = "width:100%;height:25px;display:flex;flex-wrap:nowrap;"
      titleDiv.style.cssText = "height:25px;line-height:25px;text-indent:10px;" +
        "font-size:" + fontsize + ";color:" + fontcolor + ";font-family:" + fontfamily;
      titleDiv.innerText = obj.Name;
      var icon = document.createElement("div");
      var value = document.createElement("div");
      var label = document.createElement("div");
      icon.style.cssText = "width:20px;height:25px;color:#ffff;line-height:25px;color:#009389";
      icon.innerText = "丨";
      value.style.cssText = "width:30px;height:25px;color:#ffff;line-height:25px;font-size:15px;";
      value.innerText = obj.labelData;
      label.style.cssText = "height:11px;color:#ffff;font-size:11px;vertical-align:bottom;color:#9b9b9b;padding-top:3px;padding-left: 3px;";
      label.innerText = "治疗率";
      titleView.appendChild(titleDiv);
      titleView.appendChild(icon);
      titleView.appendChild(value);
      titleView.appendChild(label);
      var chartView = document.createElement("div");
      chartView.style.cssText = "width:100%;height:calc(100% - 25px);";
      tt.appendChild(backView);
      backView.appendChild(titleView);
      backView.appendChild(chartView);
    }else{
      var backView = document.createElement("div");
      backView.id = divId + "Background";
      backView.style.cssText = "position:absolute;width:100%;height:100%;background:" + backgroundColor + ";opacity:" + opacity;
      var titleView = document.createElement("div");
      titleView.id = divId + "Title";
      titleView.style.cssText = "width:100%;height:25px;line-height:25px;text-indent:10px;" +
        "font-size:" + fontsize + ";color:" + fontcolor + ";font-family:" + fontfamily;
      titleView.innerText = obj.Name;
      var chartView = document.createElement("div");
      chartView.style.cssText = "width:100%;height:calc(100% - 25px);";
      tt.appendChild(backView);
      backView.appendChild(titleView);
      backView.appendChild(chartView);
    }

  window.addEventListener("resize", function () {
    setTimeout(function () {
      for (var i = 0; i < arrayChartState.length; i++) {
        arrayChartState[i].resize();
      }
    }, 1)
  });
  if (type == "Chart" || !type) {
    switch (selectStyle) {
      //柱状图表展示
      case "barBaseStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        barBaseStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "barStackBaseStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        barStackBaseStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "barLineMixStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        barLineMixStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "rowBaseStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        rowBaseStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "barPyramidStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        console.log("PPPPPPPPPPP", commonChartsDataOption);
        barPyramidStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      //折线图表展示
      case "lineBaseStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        lineBaseStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "lineAreaStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        lineAreaStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;//lineAreaStyle

      case "MedicalLineStyle":
        var commonChartsDataOption = commonChartsData(result, obj);
        MedicalLineStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      // 饼图表展示
      case "pieBaseStyle":
        var commonChartsDataOption = pieChartsData(result, obj);
        pieBaseStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "pieSectorStyle":
        var commonChartsDataOption = pieChartsData(result, obj);
        // alert(JSON.stringify(commonChartsDataOption));
        pieSectorStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      case "pieRingStyle":
        var commonChartsDataOption = pieChartsData(result, obj);
        pieRingStyle(commonChartsDataOption);
        var instanceStr = echarts.init(chartView, commonChartsDataOption.style);
        instanceStr.setOption(commonChartsDataOption);
        arrayChartState.push(echarts.init(chartView, commonChartsDataOption.style));

        break;

      default:
    }
  }
}

//改变图表尺寸，在容器大小发生改变时调用
export function resizeFun() {
  setTimeout(function () {
    for (var i = 0; i < arrayChartState.length; i++) {
      arrayChartState[i].resize();
    }
  }, 1)
}
