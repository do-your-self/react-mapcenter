import * as chartService from '../../../services/chartService';
import {initChartView} from '../../chartView/echartsAll';
import IPConfig from '../../../services/config';

export default {

  namespace: 'medicalBaseBottomViewModel',

  state: {
    bottomChartContent:   {
      Scales: "1",
      Charts: [
        {
          "id":"1",
          "Name": "11111111",
          "Type": "Chart",
          "Title": null,
          "subtitle": null,
          "theme": "medical",
          "Style": "MedicalLineStyle",
          "Option": {"sourceId":"5a77d550e1382350d23da4a4","sourceType":0,"dataset":null,"dimension":[{"name":"地名","alias":"","index":0,"type":0,"typeName":"文本","content":null},{"name":"占比","alias":"","index":1,"type":2,"typeName":"小数","content":null}],"xDimension":[0],"yDimension":[1]},
          "seriesName":"雷奇奇333",
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
      let thisModel = yield select(state => state.medicalBaseBottomViewModel);
      let chartContent = thisModel.bottomChartContent;
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
  },

  reducers: {

  },

};
