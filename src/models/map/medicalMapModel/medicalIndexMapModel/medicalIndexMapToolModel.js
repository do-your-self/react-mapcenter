import {message} from 'antd';
export default {

  namespace: 'medicalIndexMapToolModel',


  state: {
    /**
     *
     * @property {object} medicalIndexMapToolModel
     */
    medicalIndexMapToolClass:null,
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
    initMedicalIndexMapToolClass(state,action){
      if (action.payload != null) {
        state.medicalIndexMapToolClass = action.payload;
      }
      return { ...state, ...action.payload };
    },

    setCamera(state, action) {
      if (state.medicalIndexMapToolClass != null) {
      state.camera = action.payload;
      state.medicalIndexMapToolClass.locationSetUpCamera(state.camera);
    }
      return {...state, ...action.payload};
    },

    setTemplateMapStyle(state, action) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.setMapStyle(action.payload);
      }
      return {...state, ...action.payload};
    },

    zoomInButtonReducer(state) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.zoomInButtonMethod();
      }
      return {...state};
    },
    zoomOutButtonReducer(state) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.zoomOutButtonMethod();
      }
      return {...state};
    },
    addPitchMapRotationButtonReducer(state) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.addPitchMapRotationButtonMethod();
      }
      return {...state};
    },
    reducePitchMapRotationButtonReducer(state) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.reducePitchMapRotationMethod();
      }
      return {...state};
    },
    resetNorthButtonReducer(state) {
      if (state.medicalIndexMapToolClass != null) {
        state.medicalIndexMapToolClass.resetNorthButtonMethod();
      }
      return {...state};
    },

  },

};
