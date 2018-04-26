// medicalIndexRightViewModel
export default {

  namespace: 'medicalIndexRightViewModel',

  state: {
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

  },

};
