
export default {

  namespace: 'mapToolModel',

  state: {
    dasTypeState:null,
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
      // alert(action.payload)
      state.dasTypeState = action.payload;
      return { ...state, ...action.payload };
    },
  },

};
