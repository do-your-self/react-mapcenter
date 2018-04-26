import request from '../../utils/request';
import baseConfig from '../config';

/**
*医疗基础地图渲染服务
*/
export async function medicalBaseMapService({params}) {
  let params1 = {"dataset":null,"dimension":
  [{"alias":"lon","content":null,"index":0,"name":"116_37833","type":2,
  "typeName":"小数"},{"alias":"lat","content":null,"index":1,"name":"39_957597","type":2,
  "typeName":"小数"}],"sourceId":"5a962321e1382374d60dcc46","sourceType":0,
  "where":{"conditions":[{"operator":0,"value":null}]}}
  return request(baseConfig.userServiceDomain + '/dataeye/v1/data/filter/csv?&usercode=2ac92d9680026425a43bdc283c294f5c&sessionid=0b075faa211cbcddcef27f04d3e64e7ausercode=undefined&sessionid=undefined', {
    method: 'post',
    body:JSON.stringify(params1)
  });
}
/**
* 医疗指数地图渲染服务
*/
export async function medicalIndexMapService({type}) {
  return request(baseConfig.raeServiceDomain + '/getsource?type='+type, {
    method: 'get'
  });
}

