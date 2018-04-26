import {message} from 'antd'
import {layerTypes} from '../../../../utils/bdFisheryUtils/bdUtils';
import {handle_x, handle_y} from "../../../../utils/bdFisheryUtils/latitude";
import '../../Map/raeCSS/Mapdc.less';
import '../../Map/raeCSS/Chart.less';
import '../../Map/raeCSS/Css.less';
import '../../Map/mapboxgl.less';

import {d3,dc} from 'd3';
import {crossfilter} from 'mapd-crossfilter';
import MapdCon from 'mapd-connector';
// import '../../../../../public/rae/mapdc.js';
// import '../../../../../public/rae/browser-connector.js';
// // import '../../../../../public/rae/MapdCon.js';
// import {crossfilter} from '../../../../../public/rae/mapd-crossfilter.js';
// import '../../../../../public/rae/d3.min.js';



import raeMarkerImage from '../../../../assets/bdFishery/rae_marker.png';
import close_pop_image from '../../../../assets/bdFishery/close_pop.png';
import china_image from '../../../../assets/bdFishery/china.png';

// import '../../../../../public/mapd/thrift.js';
// import '../../../../../public/mapd/mapd.thrift.js';
// import '../../../../../public/mapd/mapd_types.js';

// const mapLayerId = "scatterImage";
const scatterLayer1 = "lshscatterLayer1";
const scatterLayer2 = "lshscatterLayer2";

const scatterSource1 = "lshscatterSource1";
const scatterSource2 = "lshscatterSource2";

class LSHistoryScatterLayer {

  constructor(map, mapboxgl,dispatch) {

    this.map = map;
    this.mapboxgl = mapboxgl;
    this.dispatch = dispatch;
    // this.connectMapD();

    /**
     * 平移地图停止事件
     * @method handleMapMoveend
     * 地图缩放事件
     * @method handleMapZoomend
     * 地图点击事件
     * @method handleMapClick
     * 地图数据加载事件
     * @method handleMapSourceData
     * @for MessDataScatterLayer
     * @param {xxx} xxx
     * @return {dic} e 地图事件
     */

    this.handleMapMoveend = this.handleMapMoveend.bind(this);
    this.handleMapZoomend = this.handleMapZoomend.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMapSourceData = this.handleMapSourceData.bind(this);
    this.mapEvent();
    /**
     * napd连接
     * @property {dic} this.connector
     * 数据库名称
     * @property {string} this.tableName
     * 经度
     * @property {string} this.lon
     * 纬度
     * @property {string} this.lat
     * 过滤字段
     * @property {string} this.field
     * 查询数量
     * @property {int} this.limit
     * 时间轴x轴字段
     * @property {string} this.timeFilter_xfield
     * 散点颜色
     * @property {string} this.fillColor
     * 散点尺寸
     * @property {int} this.fillColorSize
     */
    this.connector = null;
    // this.tableName = "stellitedb";
    // this.lon = "Lon";
    // this.lat = "Lat";
    // this.field = "country";
    this.limit = "300000";
    // this.timeFilter_xfield = "receive_time";
    this.fillColor = "red";
    this.fillColorSize = 2;

    /**
    * 添加渲染图片图层1
    * @property {dic} this.scatterMapLayer1
    * 添加渲染图片图层2
    * @property {dic} this.scatterMapLayer2
    * 图层数据源
    * @property {dic} this.scatterMapSource
    */
    this.scatterMapLayer1 = null;
    this.scatterMapLayer2 = null;
    this.scatterMapSource = null;


    /**
    * dc图表对象
    * @property {dic} this.dcTimeChart
    * 查询数据开始时间
    * @property {string} this.startTime
    * 查询数据结束时间
    * @property {string} this.endTime
    */

    this.dcTimeChart = null;
    this.startTime = null;
    this.endTime = null;

    /**
    * 弹出框
    * @property {dic} this.popup
    * 查询数据开始时间
    * @property {dic} this.marker
    */
    this.popup = null;
    this.marker = null;


    this.setInterval = null;
  }


  initMarker(e) {
    let icon = document.createElement('div');
    icon.className = 'marker';
    icon.style.backgroundImage = 'url("' + raeMarkerImage + '")';
    icon.style.backgroundSize = "20px 20px";
    icon.style.width = '20px';
    icon.style.height = '20px';
    if (this.marker == null) {
      this.marker = new this.mapboxgl.Marker(icon);
    }
    // this.marker.setLngLat(e.lngLat).addTo(this.scatterMapLayer1);
    this.marker.setLngLat([e.lag[0],e.lag[1]]);
    this.marker.addTo(this.map)

  }

  /*
  *移除marker点
  */
   removeMarker() {
     if (this.marker) {
       this.marker.remove();
     }
   }

  initPopup(e) {

    let currentThis = this;
    let markerHeight = 15,
      markerRadius = 15,
      linearOffset = 15;
    let popupOffsets = {
      'top': [
        0, markerHeight
      ],
      'top-left': [
        markerHeight, markerHeight
      ],
      'top-right': [-markerHeight,
        markerHeight
      ],
      'bottom': [
        0, -markerHeight
      ],
      'bottom-left': [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1
      ],
      'bottom-right': [-linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1
      ],
      'left': [
        markerRadius,
        (markerHeight - markerRadius) * -1
      ],
      'right': [-markerRadius,
        (markerHeight - markerRadius) * -1
      ]
    };
    // let div = window.document.createElement('div');
    // div.style.background="orange";
    // div.style.width = 150;
    // div.innerHTML = '你是第一行，你是第一行，你是第一行，你是第一行，你是第一行!';
    this.removePopup();
    this.popup = new this.mapboxgl.Popup({
      offset: popupOffsets
    });

    let content = '<div style="width:512px;">' +
    '<div style="width:392;height:32px;color:white;font-size:12px;line-height:32px;text-indent:10px;">海南渔船<img id="' + e.lag[0].toString() + '" src="' + close_pop_image + '" style="float:right;margin-right:10px;margin-top:5px;width:24px;height:24px" /></div>' +
    '<div style="height:1px;width:100%;background:#5678AB"></div>' + '<div style="min-height:132px">' + '<div style="width:120px;height:calc(100% - 32px);position:absolute;float:left">' + '<div style="position: absolute;top: 50%;transform: translate(-50%,-50%);left:50%;width:100px;height:100px">' +
    '<img src="' + china_image + '" style="position: absolute;left: 50%;transform: translateX(-50%);width:86px;height:57px;background:blue;margin 0 auto;display:block">' +
    '</img>' + '<div style="position: absolute;margin-top:67px;font-size:13px;color:white;width:100%;text-align:center;">中国' + '</div>' +
    '<div style="position: absolute;margin-top:87px;font-size:13px;color:white;width:100%;text-align:center;">CHINE' + '</div>' + '</div>' + '</div>' +
    '<div style="width:392;height:100%;margin-left:120px">' +

    '<div style="display:inline-block;margin-top:12px;margin-left:16px"><div style="float:left; display:inline;color:#209DF1;text-align:left;line-height:auto;margin-right:10px;width:56px">船名</div><div style="float:left; display:inline;outline:none;color:white;font-size:13px;width:100px">'+e.shipName+'</div></div>' +
    '<div style="display:inline-block;margin-top:12px;margin-left:16px"><div style="float:left; display:inline;color:#209DF1;text-align:left;line-height:auto;margin-right:10px;width:56px">终端卡号</div><div style="float:left; display:inline;outline:none;color:white;font-size:13px;width:100px">'+e.termNo+'</div></div>' +
    '<div style="display:inline-block;margin-top:12px;margin-left:16px"><div style="float:left; display:inline;color:#209DF1;text-align:left;line-height:auto;margin-right:10px;width:56px">经度</div><div style="float:left; display:inline;outline:none;color:white;font-size:13px;width:100px">'+e.lag[0]+'</div></div>' +
    '<div style="display:inline-block;margin-top:12px;margin-left:16px"><div style="float:left; display:inline;color:#209DF1;text-align:left;line-height:auto;margin-right:10px;width:56px">纬度</div><div style="float:left; display:inline;outline:none;color:white;font-size:13px;width:100px">'+e.lag[1]+'</div></div>' +
    '<div style="display:inline-block;margin-top:12px;margin-left:16px"><div style="float:left; display:inline;color:#209DF1;text-align:left;line-height:auto;margin-right:10px;width:56px">报告时间</div><div style="float:left; display:inline;outline:none;color:white;font-size:13px;width:200px">'+e.postTime+'</div></div>' +

    '<div style="display:inline-block;margin-left:16px;width:100%;height:15px;"></div>' +
    '</div>' + '</div>' + '</div>';

    this.popup.setLngLat([e.lag[0],e.lag[1]])
    this.popup.setHTML('<div style="width:512px;background:black;">' + content +
    // '<div style="position:absolute;width:15px;height:15px;background:#1BF8ED;border:3px solid white;border-radius:50%;transform: translate(-50%, 100%);margin-left:50%;margin-top:-4.5px;"></div>'+
    // '<div style="position:absolute;margin 0 auto;transform: translate(-50%, 100%);margin-left:50%;border-top:10px solid black;flex-direction: column-reverse;-webkit-flex-direction: column-reverse;height:0px;width:0px;border-right: 10px solid transparent;border-left: 10px solid transparent;margin-top:-10px;margin-bottom:-10px"></div>'+
    '</div>')
    this.popup.addTo(this.map);
    // popup.addLayer();
    document.getElementById(e.lag[0].toString()).onclick = function() {
      currentThis.removePopup();
      currentThis.removeMarker();
    }

  }


  /*
  *移除popup点
  */
  removePopup() {
    if (this.popup) {
      this.popup.remove();
    }
  }

  addMarkerAndPopup(e){
     this.initMarker(e);
     this.initPopup(e);
  }

  /*
  *订阅地图事件
  */
  mapEvent() {
    // this.map.on("sourcedata", this.handleMapSourceData);
  }

  /*
  *地图平移
  */
  handleMapMoveend(e){
    this.refreshImageLayer()
  }

  /*
  *地图缩放
  */
  handleMapZoomend(e){
    this.refreshImageLayer()
  }

  /*
  *地图缩放过程图层数据刷新
  */
   refreshImageLayer(){
     let zoom = this.map.getZoom();
     if (zoom < 11) {
       this.addMapLay()
       // this.setInterval = setInterval(()=>{
       //   console.log("tttttttttttttttttt");
       //   this.addMapLay()
       // },5000)
       // clearInterval(setInterval);

     }else {
       this.hiddenLayer1AndLayer2()
       this.removePopup();
       this.removeMarker();

     }
   }

  hiddenLayer1AndLayer2(){
    let layerState1 = this.map.getLayoutProperty(scatterLayer1,"visibility");
    if (layerState1 == "visible") {
      this.map.setLayoutProperty(scatterLayer1, 'visibility', 'none');
    }
    let layerState2 = this.map.getLayoutProperty(scatterLayer2,"visibility");
    if (layerState2 == "visible") {
      this.map.setLayoutProperty(scatterLayer2, 'visibility', 'none');
    }
  }

  /*
  *地图点击
  */
  handleMapClick(e) {
    // console.log("eeeeeee",e);
    let zoom = this.map.getZoom();
    if (zoom&&zoom < 11) {
      this.dispatch({type:"raeBaseMapModel/getHisLocationEffect",payload:e.lngLat})
    }else {
      console.log("大尺度下");
    }
  }

  getHisLocation(data){
    // alert(JSON.stringify(data))
    // "longItude":124.65599060058594,"latItude":
    this.addMarkerAndPopup(data);
  }

  hiddenPopAndMarker(){
    this.removePopup();
    this.removeMarker();
  }




  getMessDataContent(lon, lat, field, limit) {
    this.lon = lon;
    this.lat = lat;
    this.field = field;
    this.limit = limit;
    this.removeMapLay();
    this.addMapLay()
  }





  connectMapD(){
    this.connector = new MapdCon()
    .protocol("http")
    .host("223.223.200.50")
    .port("19092")
    .dbName("test")
    .user("xskj")
    .password("xskj")
  }


  /*
  *图层配置参数
  */
  initLayerData(mapdData){
    this.mapData = mapdData.list;
    this.mapStyle = mapdData.data;
    // console.log("mmmmmmmmmmmmmmmm11",this.mapData);
    // console.log("mmmmmmmmmmmmmmmm22",this.mapStyle);
    let name =  JSON.parse(this.mapStyle.colorinfo).domain
    let color =JSON.parse(this.mapStyle.colorinfo).range;
    setTimeout(()=>{
      this.dispatch({type:"bdLegendModel/getArrayLegendReducer",payload:{
        color:color,
        name:name
      }})
    })

  }

 /*
 *连接mapd数据库
 **/
  addMapLay() {

    let connectData = JSON.parse(this.mapData.connectinfo);
    let connectdbName = this.mapData.dbname;
    // alert(JSON.stringify(connectData))
    let currentThis = this;

    this.connector = new MapdCon()
    .protocol("http")
    .host(connectData.host)
    .port(connectData.port)
    .dbName(connectdbName)
    .user(connectData.user)
    .password(connectData.password)

    currentThis.connector.connect((error, con) => {
      // console.log("eeeeerrrr",error);
      if (error) {
        message.error("渲染错误");
      } else {
        this.initVega();
        let tableName = JSON.parse(currentThis.mapData.excutesql).data.name;
        // alert(tableName)
        let crossFilter = crossfilter(con, tableName).then(function(cf) {
          currentThis.createCharts(cf, con, tableName);
          // currentThis.createRowCharts(cf);
        })
        // console.log("crossfilter", crossFilter);
      }
    });

  }


  /*
  *创建图表
  **/
  createCharts(crossFilter, con, tableName) {
    // alert(currentThis.mapData.ctseries)
    let currentThis = this;
    var timeChartMeasures = [
      {
        expression: currentThis.mapData.tseries,
        agg_mode: "min",
        name: "minimum"
      }, {
        expression: currentThis.mapData.tseries,
        agg_mode: "max",
        name: "maximum"
      }
    ]
    crossFilter.groupAll().reduce(timeChartMeasures).valuesAsync(true).then(function(timeChartBounds) {
      var timeChartDimension = crossFilter.dimension(currentThis.mapData.tseries);
      let mapBounds = currentThis.map.getBounds();

      timeChartDimension.projectOnAllDimensions(true);
      const xDim = crossFilter.dimension(currentThis.mapData.xseries);
      const yDim = crossFilter.dimension(currentThis.mapData.yseries);
      xDim.filterRelative([mapBounds._sw.lng, mapBounds._ne.lng]);
      yDim.filterRelative([mapBounds._sw.lat, mapBounds._ne.lat]);
      crossFilter.filter().filter(xDim.getFilterString());
      crossFilter.filter().filter(yDim.getFilterString());

      let timeChartGroup = timeChartDimension.group().reduceCount('*')
      let width = document.getElementById('xstimeFilter').offsetWidth;
      let height = document.getElementById('xstimeFilter').offsetHeight;
      let colorScheme = ["#0082fc"]

      if (!currentThis.dcTimeChart) {
        currentThis.dcTimeChart = dc.barChart('#xstimeFilter');
        currentThis.dcTimeChart.width(width).height(height + 26)

      currentThis.dcTimeChart
      // .elasticY(true)
      .renderHorizontalGridLines(true)
      .brushOn(true)
      // .xAxisLabel('xxxxxxxxxxx')
      // .yAxisLabel('yyyyyyyyyyy')
        .ordinalColors(colorScheme)
        .dimension(timeChartDimension)
        .group(timeChartGroup)
        .binParams({
        numBins: 288, // 288 * 5  = number of minutes in a day
        binBounds: [timeChartBounds.minimum, timeChartBounds.maximum]
      });

      /* Set the x and y axis formatting with standard d3 functions */
      currentThis.dcTimeChart.x(d3.time.scale.utc()
      .domain([timeChartBounds.minimum, timeChartBounds.maximum]))
      .yAxis()
      // .ticks(5);
      currentThis.dcTimeChart.xAxis()
      // .scale(currentThis.dcTimeChart.x())
      // .tickFormat(dc.utils.customTimeFormat)
      .orient('bottom');
    }

      dc.renderAllAsync()

      currentThis.dcTimeChart.on('filtered', (chart, filter) => {
        dc.events.trigger(() => {
          if (!(filter instanceof Array)) {
            // console.log("ttttttt111",filter);
          } else {
            // console.log("ttttttt222",filter);
            currentThis.refreshVega(chart.filter()[0], chart.filter()[1])
          }
        }, 10)
      })
    })
  }

  // //柱状图添加
  // createRowCharts = (crossFilter) => {
  //   let colorScheme = ["#0082fc", "#0082fc", "#00e9ed"]
  //   let RaeRightChart = document.getElementById('RaeRightChart');
  //   let w = RaeRightChart.offsetWidth;
  //   let h = RaeRightChart.offsetHeight;
  //
  //   // let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 50;
  //   // let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 200;
  //   let allColumns = crossFilter.getColumns();
  //   let countGroup = crossFilter.groupAll();
  //   var countWidget = dc.countWidget("#data-count")
  //     .dimension(crossFilter)
  //     .group(countGroup);
  //   let rowChartDimension = crossFilter.dimension("shipName");
  //   // let rowChartDimension = crossFilter.dimension("dest_state");
  //   let rowChartGroup = rowChartDimension.group().reduceCount();
  //   console.log(document.getElementById('RaeRightChart'),'RaeRightChart')
  //   let dcBarChart =  dc.rowChart('#rowChart')
  //     .height(h)
  //     .width(w)
  //     .elasticX(true)
  //     .cap(20)
  //     .othersGrouper(false)
  //     .ordinalColors(colorScheme)
  //     .measureLabelsOn(true)
  //     .dimension(rowChartDimension)
  //     .group(rowChartGroup)
  //     .autoScroll(false);
  // }

  /*
  *刷新图层
  **/
  refreshVega(startTime, endTime) {
    let currentThis = this;
    const dateFormat = d3.time.format('%Y-%m-%d %H:%M:%S');
    console.log("starttime", dateFormat(startTime));
    console.log("endTime", dateFormat(endTime));
    currentThis.startTime = dateFormat(startTime);
    currentThis.endTime = dateFormat(endTime);
    currentThis.initVega();
  }


   /**
   *先创建一个空图片图层
   */

  createImageLayer(){

    if (this.map.getLayer(scatterLayer1)||this.map.getLayer(scatterLayer2)) {
      return false;
    }

    let mapBounds = this.map.getBounds();
    let leftTop = [mapBounds._sw.lng, mapBounds._ne.lat];
    let rightTop = [mapBounds._ne.lng, mapBounds._ne.lat];
    let rightBottom = [mapBounds._ne.lng, mapBounds._sw.lat];
    let leftBottom = [mapBounds._sw.lng, mapBounds._sw.lat];

    // china_image
    let sourceData1 = {
      "type": "image",
      "url": "",
      coordinates: [leftTop, rightTop, rightBottom, leftBottom]
    }
    this.scatterMapSource1 = this.map.addSource(scatterSource1, sourceData1);
    this.scatterMapLayer1 = this.map.addLayer({
        "id": scatterLayer1,
        "type": "raster",
        "source": scatterSource1,
        "paint": {
          "raster-opacity": 1.0
        }

    });

    let sourceData2 = {
      "type": "image",
      "url": "",
      coordinates: [leftTop, rightTop, rightBottom, leftBottom]
    }
    this.scatterMapSource2 = this.map.addSource(scatterSource2, sourceData2);

    this.scatterMapLayer2 = this.map.addLayer({
        "id": scatterLayer2,
        "type": "raster",
        "source": scatterSource2,
        "paint": {
          "raster-opacity": 1.0
        }

    });

    this.scatterMapLayer1.on("click", this.handleMapClick);
    this.scatterMapLayer1.on("dragend", this.handleMapMoveend);
    this.scatterMapLayer1.on("zoomend", this.handleMapZoomend);
    this.map.setLayoutProperty(scatterLayer1, 'visibility', 'none');
  }

  FirstMapLayData(){

  }

  MapLayData(blobUrl) {
    let currentThis = this;
    let layerState1 = this.map.getLayoutProperty(scatterLayer1,"visibility");
    let layerState2 = this.map.getLayoutProperty(scatterLayer2,"visibility");
    console.log("111111111111111");
    if (layerState1 == "none"&&layerState2 == "none") {
       this.map.setLayoutProperty(scatterLayer1, 'visibility', 'visible');
       currentThis.updateSource1(blobUrl);
       return;
    }
    if (layerState1 == "none") {
      console.log("111111111111111xxxxxx");
      this.map.setLayoutProperty(scatterLayer1, 'visibility', 'visible');
      currentThis.updateSource1(blobUrl);

      if (layerState2 == "visible") {
        setTimeout(()=>{
          this.map.setLayoutProperty(scatterLayer2, 'visibility', 'none');
        },500)
      }

    }
     if (layerState2 == "none") {
      console.log("111111111111111yyyyyyy");
      this.map.setLayoutProperty(scatterLayer2, 'visibility', 'visible');
      currentThis.updateSource2(blobUrl)
      if (layerState1 == "visible") {
        setTimeout(()=>{
          this.map.setLayoutProperty(scatterLayer1, 'visibility', 'none');
        },500)
      }

    }
  }


  updateSource1(blobUrl){
    let currentThis = this;
    let mapBounds = currentThis.map.getBounds();
    let leftTop = [mapBounds._sw.lng, mapBounds._ne.lat];
    let rightTop = [mapBounds._ne.lng, mapBounds._ne.lat];
    let rightBottom = [mapBounds._ne.lng, mapBounds._sw.lat];
    let leftBottom = [mapBounds._sw.lng, mapBounds._sw.lat];
    currentThis.map.removeSource(scatterSource1);
     let sourceData1 = {
      "type": "image",
      "url": blobUrl,
      coordinates: [leftTop, rightTop, rightBottom, leftBottom]
    }
    currentThis.map.addSource(scatterSource1, sourceData1);
  }

  updateSource2(blobUrl){
    let currentThis = this;
    let mapBounds = currentThis.map.getBounds();
    let leftTop = [mapBounds._sw.lng, mapBounds._ne.lat];
    let rightTop = [mapBounds._ne.lng, mapBounds._ne.lat];
    let rightBottom = [mapBounds._ne.lng, mapBounds._sw.lat];
    let leftBottom = [mapBounds._sw.lng, mapBounds._sw.lat];
    currentThis.map.removeSource(scatterSource2);
       let sourceData2 = {
        "type": "image",
        "url": blobUrl,
        coordinates: [leftTop, rightTop, rightBottom, leftBottom]
       }
    currentThis.map.addSource(scatterSource2, sourceData2);
  }





 /**
 *控制图层和图层相关显示隐藏
 */
  mapLayerDispaly(){
      let layerState1 = this.map.getLayoutProperty(scatterLayer1,"visibility");
      if (layerState1 == "visible") {
        this.map.setLayoutProperty(scatterLayer1, 'visibility', 'none');
      }
      else {
        this.map.setLayoutProperty(scatterLayer1, 'visibility', 'visible');
      }

      let layerState2 = this.map.getLayoutProperty(scatterLayer2,"visibility");
      if (layerState2 == "visible") {
        this.map.setLayoutProperty(scatterLayer2, 'visibility', 'none');
      }
      else {
        this.map.setLayoutProperty(scatterLayer2, 'visibility', 'visible');
      }


    this.removeMarker();
    this.removePopup();

  }

  handleMapSourceData(e) {
    let isSourceLoaded = e.isSourceLoaded;
    if (isSourceLoaded) {
      // console.log("xxxxxxxxx",isSourceLoaded);
    }
  }

  /*
  *渲染vega
  **/
  initVega() {
    let currentThis = this;
    const connector = currentThis.connector;
    // console.log("sessionId", this.connector.sessionId());
    let mapBounds = currentThis.map.getBounds();
    let leftTop = [mapBounds._sw.lng, mapBounds._ne.lat];
    let rightTop = [mapBounds._ne.lng, mapBounds._ne.lat];
    let rightBottom = [mapBounds._ne.lng, mapBounds._sw.lat];
    let leftBottom = [mapBounds._sw.lng, mapBounds._sw.lat];

    let lng1 = handle_x(mapBounds._sw.lng);
    let lng2 = handle_x(mapBounds._ne.lng);
    let lat1 = handle_y(mapBounds._sw.lat)
    let lat2 = handle_y(mapBounds._ne.lat)

    console.log("mapBounds", mapBounds);

    // let test = `select CONV_4326_900913_Y(lon) as x,CONV_4326_900913_X(lat) as y,country as color,ais_source_id as size,mmsi,heading,ais_source_id,stellitedb.rowid FROM stellitedb  where (lon >= ${mapBounds._sw.lng} AND lon <= ${mapBounds._ne.lng}) AND (lat >= ${mapBounds._sw.lat} AND lat <= ${mapBounds._ne.lat}) LIMIT 100000`;
    // console.log("vvvvvvvvv", test);
    /**
    * vega5大属性
    *  const  exampleVega  =  {
    *  width ： 384 ，                可见区域宽
    *  height ： 564 ，               可见区域高
    *  data ： [  ...  ]，            数据源
    *  scales ： [  ...  ]，          scales属性映射marks到可视化区域
    *  marks ： [  ...  ]             marks属性指定了每个数据项呈现方式的图形属性
};
    */
    let sql = null;
    let excutesql = JSON.parse(this.mapData.excutesql).data.sql;
    if (currentThis.startTime == null) {
      sql = `${excutesql}
      (${currentThis.mapData.xseries} >= ${mapBounds._sw.lng} AND ${currentThis.mapData.xseries} <= ${mapBounds._ne.lng}) AND
      (${currentThis.mapData.yseries} >= ${mapBounds._sw.lat} AND ${currentThis.mapData.yseries} <= ${mapBounds._ne.lat})
      LIMIT ${currentThis.limit}`;
      console.log("qqqqqqq",sql);
    } else {
      sql = `${excutesql}
      (${currentThis.mapData.xseries} >= ${mapBounds._sw.lng} AND ${currentThis.mapData.xseries} <= ${mapBounds._ne.lng}) AND
      (${currentThis.mapData.yseries} >= ${mapBounds._sw.lat} AND ${currentThis.mapData.yseries} <= ${mapBounds._ne.lat}) AND
      (${currentThis.mapData.tseries} >= '${currentThis.startTime}') AND
      (${currentThis.mapData.tseries} <= '${currentThis.endTime}')  LIMIT ${currentThis.limit}`;
    }
    console.log("qqqqqqq1111", sql);
    let vegaJSON = {
      "width": document.documentElement.clientWidth,
      "height": document.documentElement.clientHeight,
      "data": [
        {
          /*数据库名称*/
          "name": JSON.parse(currentThis.mapData.excutesql).data.name,
          /*通过sql语句查找到数据*/
          sql: sql
        }
      ],
      "scales": [
        //经度范围  影射到屏幕宽度
        {
          "name": "x",
          "type": "linear",
          "domain": [
            lng1, lng2
          ],
          "range": "width"
        },
        //纬度范围   映射到屏幕高度
        {
          "name": "y",
          "type": "linear",
          "domain": [
            lat1, lat2
          ],
          "range": "height"
        },
        // {
        //   "name": "pointcolor",
        //   "type": "linear",
        //   "domain": [10,100],
        //   "range": ["blue","red"],
        //   "clamp": true
        // },
        {
          name: 'pointcolor',
          type: 'ordinal',
          //   /*根据字段类型进行颜色渲染*/
          domain: JSON.parse(currentThis.mapStyle.colorinfo).domain,
          range: JSON.parse(currentThis.mapStyle.colorinfo).range,
          default: JSON.parse(currentThis.mapStyle.colorinfo).default,
          nullValue: JSON.parse(currentThis.mapStyle.colorinfo).nullValue
        }
      ],
      "marks": [
        {
          "type": JSON.parse(currentThis.mapStyle.styleinfo).type,
          "from": {
            "data": JSON.parse(currentThis.mapData.excutesql).data.name
          },
          "properties": {
            // "shape": "square",
            "x": {
              "scale": "x",
              "field": "x"
            },
            "y": {
              "scale": "y",
              "field": "y"
            },
            // "width": "20",
            // "height": "20",
            // "fillColor": "green",
            // "size": {
            //   "value": 1
            // }
            // "fillColor":"#17f7f1",
            "fillColor": {
              "scale": "pointcolor",
              "field": currentThis.mapData.filedvalue
            },
            "size": JSON.parse(currentThis.mapStyle.styleinfo).properties.size.value
            // "size": {
            //   "value": 10
            // }

          }
        }
      ]
    };

    // connector.logging(true);
    // connector.connect((error, con)=> {
    // 第三个参数 压缩级别
    connector.renderVega(1, JSON.stringify(vegaJSON), 1, function(error, result) {
      if (error) {
        // console.log(error.message);
      } else {

        let blobUrl = `data:image/png;base64,${result.image}`
        currentThis.MapLayData(blobUrl);
        // })
        // console.log("gggggggggg",currentThis.map.getSource("picture"));
      }
      // });
    });
  }

  removeMapLay() {

  }

}
export default LSHistoryScatterLayer;
