import * as medicalService from '../../../../services/medicalService/medicalService';
import {message} from 'antd';
export default {

  namespace : 'medicalBaseMapModel',

  state : {
    /**
     *
     * @property {object} medicalBaseMapModel
     */
    medicalBaseMapClass: null,
    baseMapLayerData: null,
    param: {
      year: 0,
      month: 0,
      week: 0,
      y_day: 0,
      m_day: 0,
      w_day: 0,
      province: "",
      city: "",
      area: "",
      level: "",
      agid: 0,
      sex: 0
    }
  },

  subscriptions : {
    setup({dispatch, history}) {}
  },

  effects : {
    *getMedicalBaseMapLayerData({
      payload
    }, {call, put, select}) {
      let thisModel = yield select(state => state.medicalBaseMapModel);
      let result = yield call(medicalService.medicalBaseMapService, thisModel.param);
      // alert(JSON.stringify(result))
      if (result.data.result == true) {
        // alert(JSON.stringify(result))
        yield put({type: "getBaseMapLayerDataReducer", payload: result})
      } else {}
    }
  },

  reducers : {
    /**
    *初始化
    */
    initMedicalBaseMapClass(state, action) {
      if (action.payload != null) {
        state.medicalBaseMapClass = action.payload;
      }
      return {
        ...state,
        ...action.payload
      };
    },

    getBaseMapLayerDataReducer(state, action) {
      if (state.medicalBaseMapClass != null) {
        state.baseMapLayerData = action.payload;
        state.medicalBaseMapClass.setMapLayerData(state.baseMapLayerData);
      }
      return {
        ...state,
        ...action.payload
      };
    },
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

  }
};
