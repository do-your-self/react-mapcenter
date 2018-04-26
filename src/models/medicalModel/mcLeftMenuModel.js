
export default {

  namespace: 'mcLeftMenuModel',

  state: {
    selectMenuState:false,
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
    changeSelectMenuReducer(state, action) {
      state.selectMenuState = action.payload;
      return { ...state, ...action.payload };
    },
  },

};
