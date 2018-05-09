import IPConfig from '../../../services/config';
import * as mdService from '../../../services/medicalService/medicalService';

export default {

  namespace: 'medicalIndexLeftViewModel',

  state: {
    title: "十项指标数据",
    city: [],
    level: [{name:"全部",value:""}, {name:"二级",value:"二级"}, {name:"三级",value:"三级"}],
    sex: [{name:"全部",value:0}, {name:"男",value:1}, {name:"女",value:2}],
    age: [{name:"全部",value:0}, {name:"1-10",value:1}, {name:"11-20",value:2}, {name:"21-30",value:3}, {name:"31-40",value:4}, {name:"41-50",value:5}, {name:"51-60",value:6}, {name:"61-70",value:7}, {name:"71-80",value:8}, {name:"81-90",value:9}, {name:"91-100",value:10}],
    time: [{name:"全部",value:""}, {name:"到院时间",value:"到院时间"}, {name:"住院时间",value:"住院时间"}, {name:"发病时间",value:"发病时间"}]
  },


  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *getData({payload}, {call,put,select}) {

    },
    *getCityData({ payload }, {call, put}) {
      let result = yield call(mdService.getCityDataService);
      if(result.data.result){
        yield put({type:'setCityData', payload: result.data.data});
      }
    }
  },

  reducers: {
    setCityData(state, {payload}) {
      let city = payload;
      return {...state,city}
    }
  },

};
