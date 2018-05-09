import * as chartService from '../../../services/chartService';
import {initChartView} from '../../chartView/echartsAll';
import IPConfig from '../../../services/config';
import * as medicalService from "../../../services/medicalService/medicalService";

export default {

  namespace: 'medicalBaseBottomViewModel',

  state: {
    bottomChartContent:   {
      params: {group: "month"},
      Scales: "1",
      Charts: [
        {
          "id":"1",
          "Name": "就诊人数",
          "Type": "Chart",
          "Title": null,
          "subtitle": null,
          "theme": "medicalLine",
          "Style": "MedicalLineStyle",
          "Option": {"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]},
          "seriesName":"雷奇奇333",
          "series":[
            {
              "type":"line",
              "name":"男",
              "xAxisName":"时间",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"女",
              "xAxisName":"时间",
              "yAxisName":"人"
            },
            {
              "type":"line",
              "name":"全部",
              "xAxisName":"时间",
              "yAxisName":"人"
            }
          ],
          "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
        }
      ]
    },
    param:{
      province: '',
      city: '',
      area: '',
      level: '',
      sex: 0,
      group: 'month'
    },
    dispatch:null,
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
      let thisModel = yield select(state => state.medicalBaseBottomViewModel);
      let chartContent = thisModel.bottomChartContent;
      // console.log(chartContent,'chartContent')
            for (let j = 0; j < chartContent.Charts.length; j++) {
              //alert("1")
              //alert(chartContent[i].ChartPannel[j].series[0].Datasource.DataConnection.Path);
              // let pathURL = IPConfig.userServiceDomain + chartContent.Charts[j].dataSource + "usercode=331abf37abe8ccb0830e46dd8ee7ba8e&sessionid=88516cce2bde42ecc3c02";
              let pathURL = IPConfig.mdServiceDomain + "/dataeye/v1/maidi/ngs/getsum";

              // alert(pathURL)
              // alert(JSON.stringify(chartContent.ChartPannel[j].Option));
              let result = yield call(medicalService.medicalIndexBottomService, thisModel.param)
              if (!result.error) {
                //  alert(JSON.stringify(chartContent[i].ChartPannel[j]));
                let obj = chartContent.Charts[j];
                let chartId = chartContent.Charts[j].id;
                let series = [];
                let desc = result.data.data.description;
                for (let i = 0; i < desc.length; i++) {
                  series.push({
                    "type":"line",
                    "name": desc[i],
                    "xAxisName":"时间",
                    "yAxisName":"人"
                  })
                }
                chartContent.Charts[j].series=series;
                yield initChartView(chartId, result, obj,thisModel.dispatch,thisModel.param.group);
              }
            }
    },
  },

  reducers: {
    //接收储存dispatch
    setDispatch(state,action){
      state.dispatch = action.payload;
      return {...state,...action}
    },

    getParamsReducer(state, action) {
      let name = action.payload.name;
      let value = action.payload.value;
      let time = action.payload.time;
      // alert(name)
      // alert(name)
      switch (name) {
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
          // state.param.group = value;

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
