export const layerTypes = {
  HEATMAP_LAYER: "HeatMapLayer",
  /*热力图*/
  GRID_LAYER: "GridLayer",
  /*矩形网格图*/
  CUBE_LAYER: "CubeLayer",
  /*立体网格图*/
  HONEYCOMB_LAYER: "HoneyCombLayer",
  /*蜂窝网格图*/
  SCATTER_LAYER: "ScatterLayer",
  GROUP_SCATTER_LAYER: "GroupScatter",
  /*散点图*/
  SIZE_SCATTER_LAYER: "SizeScatterLayer",
  /*大小点散点图*/
  MARK_SCATTER_LAYER: "MarkScatter",
  /*个性图标散点图*/
  LINE_LAYER: "LineLayer",
  /*大量线图层*/
  REGION_LAYER: "RegionLayer",
  /*大量面图层*/
  FLYLINE_LAYER: "FlyLineLayer",
  /*飞线图*/
  TRACE_LAYER: "TraceLayer",
  /*轨迹图*/
  OD_LAYER: "ODLayer",
  /*OD动态点图*/
  HEARTBEAT_LAYER: "HeartBeatLayer",
  /*心跳图*/
  STREANLINE_LAYER: "StreamLineLayer",
  /*流线图*/
  LITUPWAY_LAYER: "LitupwayLayer",
  /*道路点亮*/
  HISTOGRAM_LAYER: "HistogramLayer",
  /*柱状图*/
  HEATMAP_LAYER_MONITORING: "HeatMapLayerMonitoring",
  /*实时监控热力*/
  SCATTER_LAYER_MONITORING: "ScatterLayerMonitoring",
  /*实时监控散点*/


  MESSDATASCATTER_LAYER:"MessDataScatterLayer",
  MESSDATAHEATMAP_LAYER:"MessDataHeatMapLayer",

//   7	海量数据散点图		MessDataScatterLayer
// 8	海量数据热力图		MessDataHeatMapLayer

}

// export const markerLayerTypes = {
//   BASEMARKER_LAYER:"baseMarkerLayer"
// }

export const dataTypes = {
  JSONTYPE: "JSON",
  APITYPE: "API"
}

//图层组类型定义
export const mapLayers = {
  BASEMAP_LAYERS:"baseMapLayers",
  DEFAULTMAP_LAYERS:"defaultMapLayers",
}

// export let icons = new Map();
// (
//   function(){
//     icons.set("key","value");
//   }()
// )

// 判断图层间的包含关系

export function isIncludeCommonLayerName(name){
  const set = new Set(
    ["HeatMapLayer",
     "CubeLayer",
     "GridLayer",
     "HoneyCombLayer",
     "ScatterLayer",
     "GroupScatter",
     "SizeScatterLayer",
     "MarkScatter",
     "LineLayer",
     "RegionLayer",
     "FlyLineLayer",
     "TraceLayer",
     "ODLayer",
     "HeartBeatLayer",
     "StreamLineLayer",
     "LitupwayLayer",
     "HistogramLayer"
   ]);

 return set.has(name);
}

export function isIncludeRAELayerName(name){
  const set = new Set(
    ["MessDataScatterLayer",
     "MessDataHeatMapLayer"
   ]);
 return set.has(name);
}
// export function isIncludeRAELayerName(layerName){
//
// }
//
// export function isIncludeCommonLayerName(layerName){
//
// }
