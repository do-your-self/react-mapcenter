import * as medicalService from '../../../../services/medicalService/medicalService';
import {message} from 'antd';
export default {

  namespace: 'medicalBaseMapModel',


  state: {
    /**
     *
     * @property {object} medicalBaseMapModel
     */
    medicalBaseMapClass:null,
    baseMapLayerData:null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },


  effects: {
    *getMedicalBaseMapLayerData({payload}, {call, put,select}) {
      let params = {

      }
      let result = yield call(medicalService.medicalBaseMapService, params);
      if (result.data.result == true) {
        yield put({type:"getBaseMapLayerDataReducer",payload:result})
      }else {

      }
    },
  },

  reducers: {
    /**
    *初始化
    */
    initMedicalBaseMapClass(state,action){
      if (action.payload != null) {
        state.medicalBaseMapClass = action.payload;
      }
      return { ...state, ...action.payload };
    },

    getBaseMapLayerDataReducer(state,action){
      if (state.medicalBaseMapClass != null) {
        state.baseMapLayerData = action.payload;
        state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData);
      }
      return { ...state, ...action.payload };
    }



  },

};
