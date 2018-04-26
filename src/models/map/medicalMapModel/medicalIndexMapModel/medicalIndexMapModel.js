import {message} from 'antd';
export default {

  namespace: 'medicalIndexMapModel',


  state: {
    /**
     *
     * @property {object} medicalIndexMapClass
     */
    medicalIndexMapClass:null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {



  },

  reducers: {
    /**
    *初始化
    */
    initMedicalIndexMapClass(state,action){
      if (action.payload != null) {
        state.medicalIndexMapClass = action.payload;
      }
      return { ...state, ...action.payload };
    },



  },

};
