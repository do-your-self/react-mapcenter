import IPConfig from '../../../services/config';
import * as mdService from '../../../services/medicalService/medicalService';

export default {

  namespace: 'medicalBaseLeftViewModel',

  state: {
    title: "出院带药现状及趋势",
    city: [],
    level: [{name:"全部",value:""}, {name:"二级",value:"二级"}, {name:"三级",value:"三级"}],
    sex: [{name:"全部",value:0}, {name:"男",value:1}, {name:"女",value:2}],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
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
