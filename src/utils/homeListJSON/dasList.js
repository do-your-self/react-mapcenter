import {dasType} from '../dasUtils/dasUtils';
export const listJSON={

  baseInfo:{
    "name":"首页列表"
  },
  list:[
    {
      name:"北斗渔业实时",
      desc:"实时监测渔船位置",
      type:dasType.BDFISHERY_REALTIME
    },
    {
      name:"北斗渔业历史",
      desc:"分析历史数据",
      type:dasType.BDFISHERY_HISTORY
    },
    {
      name:"医疗",
      desc:"医院分布",
      type:dasType.MEDICAL_BASE
    }
  ]

}
