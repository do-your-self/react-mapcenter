import IPConfig from '../../../services/config';

export default {

  namespace: 'medicalBaseLeftViewModel',

  state: {
    title: "出院带药现状及趋势",
    leftSelectContent: {
      city: ["全国", "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省"],
      level: ["二级", "三级", "未定义"],
      sex: ["全部", "男", "女"]
    }
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
