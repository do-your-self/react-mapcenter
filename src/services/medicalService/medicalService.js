import request from '../../utils/request';
import baseConfig from '../config';

/**
*医疗基础地图渲染服务
*/
export async function medicalBaseMapService(params) {
  // alert(JSON.stringify(params));
  return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/ngs/gethospitalcount', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(params)
  });
}
/**
* 医疗指数地图渲染服务
*/
export async function medicalIndexMapService(params) {
  // alert(JSON.stringify(params));
  return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/ngs/gethospitalcount', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(params)
  });
}

/**
* 医疗城市下拉选项
*/
export async function getCityDataService() {
  return request(baseConfig.mdServiceDomain + "/dataeye/v1/maidi/site/get", {
    method: 'get'
  });
}

/**
*麦迪医疗十项指标服务对接
*/
export async function medicalIndexRightService(params) {
  // alert(JSON.stringify(params));
  return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/ngs/gettentarget', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(params)
  });
}


/**
 *麦迪医疗十项指标服务对接
 */
export async function medicalIndexBottomService(params) {
  // alert(JSON.stringify(params));
  return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/ngs/getsum', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(params)
  });
}



/**
 *kangshuai
 */
 export async function medicalBaseRight1Service(params) {
   // alert(JSON.stringify(params));
   return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/apc/getsum', {
     method: 'post',
     headers: {
       'Content-type': 'application/json'
     },
     body:JSON.stringify(params)
   });
 }

 /**
  *jiangya
  */
  export async function medicalBaseRight2Service(params) {
    // alert(JSON.stringify(params));
    return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/hp/getsum', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(params)
    });
  }

  /**
   *tinglei
   */
   export async function medicalBaseRight3Service(params) {
     // alert(JSON.stringify(params));
     return request(baseConfig.mediServiveDomain + '/dataeye/v1/maidi/ll/getsum', {
       method: 'post',
       headers: {
         'Content-type': 'application/json'
       },
       body:JSON.stringify(params)
     });
   }
