import {dasType} from '../../utils/dasUtils/dasUtils';
export default {

  namespace: 'baseMapModel',

  state: {
    dasTypeState:dasType.MEDICAL_BASE,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    changeDasTypeReducer(state, action) {
      state.dasTypeState = action.payload;
      return { ...state, ...action.payload };
    },
  },

};
