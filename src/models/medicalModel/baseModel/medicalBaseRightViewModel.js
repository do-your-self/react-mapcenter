import * as chartService from '../../../services/chartService';
import {initChartView} from '../../chartView/echartsAll';
import IPConfig from '../../../services/config';

export default {

  namespace: 'medicalBaseRightViewModel',

  state: {
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
              "name":"男性收入",
              "xAxisName":"年龄",
              "yAxisName":"收入"
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
              "name":"男性收入",
              "xAxisName":"年龄",
              "yAxisName":"收入"
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
              "name":"男性收入",
              "xAxisName":"年龄",
              "yAxisName":"收入"
            }
          ],
          "dataSource": "/dataeye/v1/data/filter/fortmatchart?"
        }
      ]
    }
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
      // console.log(chartContent,'chartContent')
      for (let j = 0; j < chartContent.Charts.length; j++) {
        //alert("1")
        //alert(chartContent[i].ChartPannel[j].series[0].Datasource.DataConnection.Path);
        let pathURL = IPConfig.userServiceDomain + chartContent.Charts[j].dataSource + "usercode=331abf37abe8ccb0830e46dd8ee7ba8e&sessionid=88516cce2bde42ecc3c02";
        let params = {
          url: pathURL,
          option: chartContent.Charts[j].Option
        }
        // alert(pathURL)
        // alert(JSON.stringify(chartContent.ChartPannel[j].Option));
        let result = yield call(chartService.getChartDataService, params)
        if (!result.err) {
          //  alert(JSON.stringify(chartContent[i].ChartPannel[j]));
          let obj = chartContent.Charts[j];
          let chartId = chartContent.Charts[j].id;
          initChartView(chartId, result, obj);
        }
      }
    },

    * getLabelData({payload}, {call,put,select}) {
      let pathURL = IPConfig.userServiceDomain + "/dataeye/v1/data/filter/fortmatchart?"+ "usercode=331abf37abe8ccb0830e46dd8ee7ba8e&sessionid=88516cce2bde42ecc3c02";
      let params = {
        url: pathURL,
        option:{"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]}
    }
      let result = yield call(chartService.getChartDataService, params);
      if (!result.err) {
        yield put({type:'setLabelData'})
      }
    }
  },

  reducers: {
    setLabelData(state,action) {
      state.rightChartContent.Charts[0].labelData = '70%';
      state.rightChartContent.Charts[1].labelData = '70%';
      state.rightChartContent.Charts[2].labelData = '70%';
      return {...state,...action}
    }
  },

};
