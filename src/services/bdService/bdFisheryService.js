// bdFisheryService
import request from '../../utils/request';
import baseConfig from '../config';

/**
*获取数据源类型 实时、历史
*/
export async function getSourceService({type}) {
  return request(baseConfig.raeServiceDomain + '/getsource?type='+type, {
    method: 'get'
  });
}

/**
*获取第一条数据样式
*/
export async function getListService({id}) {
  return request(baseConfig.raeServiceDomain + '/getlist?id='+id, {
    method: 'get'
  });
}
