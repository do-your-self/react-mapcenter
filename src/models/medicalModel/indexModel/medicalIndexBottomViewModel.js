// medicalIndexBottomViewModel
export default {

  namespace: 'medicalIndexBottomViewModel',

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
