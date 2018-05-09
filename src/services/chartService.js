import request from '../utils/request';
import baseConfig from './config';

//获取模版列表
export async function getChartDataService({url,option}) {
  let param = {
    url: url
  }
  return request(url, {
    headers: {
      'Content-type': 'application/json'
    },
    method:'post',
    body:JSON.stringify(option)
  });
}

//更新图表属性
export async function updateChartPanelPropertyService({
  chartid,
  usercode,
  sessionid,
  name,
  dasid,
  option
}) {
  let params = {
    chartId: chartid,
    userCode: usercode,
    sessionid: sessionid,
    name: name,
    option: option,
    dasId: parseInt(dasid)
  }
  return request(baseConfig.userServiceDomain + "/dataeye/v1/daschart/update", {
    method: 'post',
    body: JSON.stringify(params)
  });
}

//获取上传图表数据列表
export async function getChartListService({usercode, sessionid, index, count}) {
  let datatype = 1;
  let param = {
    usercode: usercode,
    sessionid: sessionid,
    datatype: 1,
    index: index,
    count: count
  }
  return request(baseConfig.userServiceDomain + "/dataeye/v1/data/getcsvlist?usercode=" + usercode + "&sessionid=" + sessionid + "&datatype=" + datatype + "&index=" + index + "&count=" + count, {method: 'post'});
}

//获取图表数据
export async function getOneChartHeaderDataService({usercode, sessionid, fileid}) {
  let param = {
    usercode: usercode,
    sessionid: sessionid,
    fileid: fileid
  }
  return request(baseConfig.userServiceDomain + "/dataeye/v1/data/getformatchartdata?usercode=" + usercode + "&sessionid=" + sessionid + "&fileid=" + fileid, {method: 'post'});
}

//获取表头
export async function getOneChartDataXYService({usercode, sessionid, fileid}) {
  let param = {
    usercode: usercode,
    sessionid: sessionid,
    fileid: fileid
  }
  return request(baseConfig.userServiceDomain + "/dataeye/v1/data/getcsvtitles?usercode=" + usercode + "&sessionid=" + sessionid + "&fileid=" + fileid, {method: 'post'});
}
