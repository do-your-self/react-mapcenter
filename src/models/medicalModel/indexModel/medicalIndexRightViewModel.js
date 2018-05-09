// medicalIndexRightViewModel
import {initChartView} from "../../chartView/echartsAll";
import IPConfig from "../../../services/config";
import * as chartService from "../../../services/chartService";
import * as medicalService from '../../../services/medicalService/medicalService';


export default {

  namespace: 'medicalIndexRightViewModel',

  state: {
    rightChartContent:{
      "Scales": "1",
      "Charts": [
        {
          "id": "chartId8",
          "Name": "医院KPI概况",
          "labelData": null,
          "Title": null,
          "Type": "Chart",
          "subtitle": null,
          "theme": "barStyle",
          "Style": "rowBaseStyle",
          "series":[
            {
              "type":"bar",
              "name":"本地区",
              "xAxisName":"",
              "yAxisName":"指标"
            },
            {
              "type":"bar",
              "name":"二级",
              "xAxisName":"",
              "yAxisName":"指标"
            },
            {
              "type":"bar",
              "name":"三级",
              "xAxisName":"",
              "yAxisName":"指标"
            }
          ],
          "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
        }

      ]
    },
    param:{
      year:0,
      month:0,
      week:0,
      y_day:0,
      m_day:0,
      w_day:0,
      province:"",
      city:"",
      area:"",
      level:"",
      agid:0,
      sex:0
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },

    * getChartsData({payload}, {call, put, select}) {  // eslint-disable-line
      let allChartType = [];
      let thisModel = yield select(state => state.medicalIndexRightViewModel);
      let chartContent = thisModel.rightChartContent;
      // console.log(chartContent,'chartContent')
      for (let j = 0; j < chartContent.Charts.length; j++) {
        //alert("1")
        //alert(chartContent[i].ChartPannel[j].series[0].Datasource.DataConnection.Path);

        // alert(JSON.stringify(params))
        // alert(JSON.stringify(chartContent.ChartPannel[j].Option));
        // alert(JSON.stringify(thisModel.param))
        let result = yield call(medicalService.medicalIndexRightService, thisModel.param)
        if (!result.err) {
          //  alert(JSON.stringify(chartContent[i].ChartPannel[j]));
          let obj = chartContent.Charts[j];
          let chartId = chartContent.Charts[j].id;
          let series = [];
          let level = thisModel.param.level;
          if(level=="二级"){
            series.push({
              "type":"bar",
              "name":"二级",
              "xAxisName":"",
              "yAxisName":"指标"
            })
          }else if(level=="三级"){
            series.push({
              "type":"bar",
              "name":"三级",
              "xAxisName":"",
              "yAxisName":"指标"
            })
          }else {
            let level = ["本地区", "二级", "三级"];
            for (let i = 0; i < level.length; i++) {
              series.push({
                "type":"bar",
                "name": level[i],
                "xAxisName":"",
                "yAxisName":"指标"
              })
            }
          }
          chartContent.Charts[j].series=series;
          yield initChartView(chartId, result, obj);
        }
      }
    },
  },

  reducers: {
    getParamsReducer(state, action) {
      let name = action.payload.name;
      let value = action.payload.value;

      let time = action.payload.time;

      switch (name) {
        case "time":
          switch(time){
            case "year":
              if(state.param.year == Number(value)){
                state.param.year = 0;
                return{...state,...action};
              }
              state.param.year = Number(value);
              state.param.month = 0;
              state.param.week = 0;
              break;
            case "month":
              let month = value.split("-");
              if(state.param.year == Number(month[0]) && state.param.month == Number(month[1])){
                state.param.year = 0;
                state.param.month = 0;
                return{...state,...action};
              }
              state.param.year = Number(month[0]);
              state.param.month = Number(month[1]);
              state.param.week = 0;
              break;
            case "week":
              let week = value.split("-");
              if(state.param.year == Number(week[0]) && state.param.week == Number(week[1])){
                state.param.year = 0;
                state.param.week = 0;
                return{...state,...action};
              }
              state.param.year = Number(week[0]);
              state.param.month = 0;
              state.param.week = Number(week[1]);

              break;
            default:
          }
          break;
        case "y_day":
          state.param.y_day = value;

          break;
        case "m_day":
          state.param.m_day = value;

          break;
        case "w_day":
          state.param.w_day = value;

          break;
        case "province":
          state.param.province = value;
          state.param.city = "";
          state.param.area = "";
          break;
        case "city":
          state.param.province = "";
          state.param.city = value;
          state.param.area = "";
          break;
        case "area":
          state.param.province = "";
          state.param.city = "";
          state.param.area = value;
          break;
        case "level":
          state.param.level = value;

          break;
        case "agid":
          state.param.agid = value;

          break;
        case "sex":
          state.param.sex = value;

          break;
        default:

      }
      return {
        ...state,
        ...action.payload
      };
    }
  },

};
