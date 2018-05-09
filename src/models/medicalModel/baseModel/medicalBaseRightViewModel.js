import * as chartService from '../../../services/chartService';
import {initChartView} from '../../chartView/echartsAll';
import IPConfig from '../../../services/config';
import * as medicalService from '../../../services/medicalService/medicalService';


export default {

  namespace: 'medicalBaseRightViewModel',

  state: {
    urls: ['/dataeye/v1/maidi/apc/getsum','/dataeye/v1/maidi/hp/getsum','/dataeye/v1/maidi/ll/getsum'],
    rightChartContent:{
      "Scales": "1:1:1",
      "Charts": [
        {
          "id": "chartId5",
          "Name": "出院时扛栓治疗",
          "labelData": null,
          "Title": null,
          "Type": "Chart",
          "subtitle": null,
          "theme": "medical",
          "Style": "barBaseStyle",
          "Option": {"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]},
          "series":[
            {
              "type":"bar",
              "name":"",
              "xAxisName":"药名",
              "yAxisName":"人"
            },
            {
              "type":"bar",
              "name":"",
              "xAxisName":"药名",
              "yAxisName":"人"
            }

          ],
          "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
        },
        {
          "id": "chartId6",
          "Name": "出院时降压药物治疗",
          "labelData": null,
          "Title": null,
          "Type": "Chart",
          "subtitle": null,
          "theme": "medical",
          "Style": "barBaseStyle",
          "Option": {"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]},
          "series":[
            {
              "type":"bar",
              "name":"",
              "xAxisName":"药名",
              "yAxisName":"人"
            },
            {
              "type":"bar",
              "name":"",
              "xAxisName":"药名",
              "yAxisName":"人"
            }
          ],
          "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
        },
        {
          "id": "chartId7",
          "Name": "出院时他汀药物治疗",
          "labelData": null,
          "Title": null,
          "Type": "Chart",
          "subtitle": null,
          "theme": "medical",
          "Style": "lineBaseStyle",
          "Option": {"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]},
          "series":[
            {
              "type":"line",
              "name":"",
              "xAxisName":"月",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"",
              "xAxisName":"月",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"",
              "xAxisName":"月",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"",
              "xAxisName":"月",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"",
              "xAxisName":"月",
              "yAxisName":"人"
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
      sex:0,
      group:"",
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
      let thisModel = yield select(state => state.medicalBaseRightViewModel);
      let chartContent = thisModel.rightChartContent;
      let arrayUrl = [medicalService.medicalBaseRight1Service,medicalService.medicalBaseRight2Service,medicalService.medicalBaseRight3Service]
      // console.log(chartContent,'chartContent')
      for (let j = 0; j < chartContent.Charts.length; j++) {

        // alert(JSON.stringify(thisModel.param))
        let result = yield call(arrayUrl[j], thisModel.param)
        if (!result.err) {
          let obj = chartContent.Charts[j];
          let chartId = chartContent.Charts[j].id;
          yield initChartView(chartId, result, obj);
        }
      }
    },

    // * getLabelData({payload}, {call,put,select}) {
    //   let pathURL = IPConfig.userServiceDomain + "/dataeye/v1/data/filter/fortmatchart?"+ "usercode=331abf37abe8ccb0830e46dd8ee7ba8e&sessionid=88516cce2bde42ecc3c02";
    //   let params = {
    //     url: pathURL,
    //     option:{"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]}
    // }
    //   let result = yield call(chartService.getChartDataService, params);
    //   if (!result.err) {
    //     yield put({type:'setLabelData'})
    //   }
    // }
  },

  reducers: {
    // setLabelData(state,action) {
    //   state.rightChartContent.Charts[0].labelData = '70%';
    //   state.rightChartContent.Charts[1].labelData = '70%';
    //   state.rightChartContent.Charts[2].labelData = '70%';
    //   return {...state,...action}
    // },
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
        case "group":
          // state.param.agid = value;

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
