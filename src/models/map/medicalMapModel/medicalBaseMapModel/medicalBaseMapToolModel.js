// medicalBaseMapToolModel
import {message} from 'antd';
export default {

  namespace: 'medicalBaseMapToolModel',


  state: {
    /**
     *
     * @property {object} medicalBaseMapToolModel
     */
    medicalBaseMapToolClass:null,
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
    initMedicalBaseMapToolClass(state,action){
      if (action.payload != null) {
        state.medicalBaseMapToolClass = action.payload;
      }
      return { ...state, ...action.payload };
    },

    setCamera(state, action) {
      if (state.medicalBaseMapToolClass != null) {
      state.camera = action.payload;
      state.medicalBaseMapToolClass.locationSetUpCamera(state.camera);
    }
      return {...state, ...action.payload};
    },

    setTemplateMapStyle(state, action) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.setMapStyle(action.payload);
      }
      return {...state, ...action.payload};
    },

    zoomInButtonReducer(state) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.zoomInButtonMethod();
      }
      return {...state};
    },
    zoomOutButtonReducer(state) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.zoomOutButtonMethod();
      }
      return {...state};
    },
    addPitchMapRotationButtonReducer(state) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.addPitchMapRotationButtonMethod();
      }
      return {...state};
    },
    reducePitchMapRotationButtonReducer(state) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.reducePitchMapRotationMethod();
      }
      return {...state};
    },
    resetNorthButtonReducer(state) {
      if (state.medicalBaseMapToolClass != null) {
        state.medicalBaseMapToolClass.resetNorthButtonMethod();
      }
      return {...state};
    },

  },

};
