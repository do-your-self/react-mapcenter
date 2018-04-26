import * as bdFisheryService from '../../../../services/bdService/bdFisheryService';
import {message} from 'antd';
export default {

  namespace: 'bdFisheryHistoryMapModel',

  state: {
    bdFisheryMapClass:null,
    lsHistoryMapClass:null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {

    /**
    *北斗渔业数据仰视你配置数据
    */
    * getBDMapLayerData({payload}, {call, put,select}) {
      let type = null;
      let layerState = payload;
      if (layerState) {
        type = 0;
      }else {
        type = 1;
      }
      let params = {
        type: type,
      }
      let result = yield call(bdFisheryService.getSourceService, params);
      if (result.data.result == true) {
        yield put({type:"getRAEMapLayerStyle",payload:result.data.data,layerState:layerState})
      }else {

      }
    },

    * getRAEMapLayerStyle({payload,layerState}, {call, put,select}) {
      // console.log("LLLLLLLLLLLLLLL",layerState);
      let list = payload;
      let params = {
        id: list[0].id,
      }
      let result = yield call(bdFisheryService.getListService, params);
      let body = {
        layerState:layerState,
        list:list[0],
        data:result.data.data[0]
      }
      if (result.data.result == true) {
        yield put({type:"bdFisheryDataReducer",payload:body})
      }
    },


  },

  reducers: {

    /**
    *初始化
    */
    initBdFisheryMapClass(state,action){
      if (action.payload != null) {
        state.bdFisheryMapClass = action.payload;
      }
      return { ...state, ...action.payload };
    },


   initLSHistoryMapClass(state,action){
     if (action.payload != null) {
       state.lsHistoryMapClass = action.payload;
     }
     return { ...state, ...action.payload };
   },
    /**
    *mapData
    */

    bdFisheryDataReducer(state,action){
      if (state.bdFisheryMapClass != null) {
        state.bdFisheryMapClass.loadBDDataStyle(action.payload);
      }
      return {...state, ...action.payload};
    }


  },

};
