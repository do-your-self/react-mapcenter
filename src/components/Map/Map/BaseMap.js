import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva'
import styles from './BaseMap.css';
import mapboxgl from 'mapbox-gl';
import mapStyle from '../../../utils/mapStyle';
import {dasTypeFuction} from './BaseMapAction';


/**
* 类说明
* @class Map   地图模块组件
*/
class BaseMap extends React.Component {

  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    // this.props.dispatch({type:'raeBaseMapModel/getMarkerPoyBoundsEffect',payload:"boundsString"})
    mapboxgl.accessToken = 'pk.eyJ1IjoibGl1eGluZ2RvbmciLCJhIjoiY2o3YWZpbXRhMGJkazJxbnpyMmtuaG8zcyJ9.aETxR-kkDby57dNqp_TvNw';
    // mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
    let map = new mapboxgl.Map({
      container: 'mapContainer',
      style: mapStyle.chinablue,
      maxZoom: 18,
      minZoom: 0,
      zoom:3,
      center:[116,39]
    });
    this.map = map;
    map.on('sourcedata', () => {
      map.resize();
    });
    this.removeMissingdivCss();
    /**
    *调用class
    */
  }

  shouldComponentUpdate(){
    dasTypeFuction(this.props,this.map,mapboxgl);
    return true
  }

  _resize = () => {
    if(this.map){
      console.log('resize')
      this.map.resize();
    }
  }

  /**
  *移除maobox原有导航栏bug样式
  */
  removeMissingdivCss = () => {
    const missingdiv = document.querySelector(".mapboxgl-missing-css");
    const mapboxglcontrolcontainer = document.querySelector(".mapboxgl-control-container");
    if (mapboxglcontrolcontainer)
      mapboxglcontrolcontainer.style.width = "none";
    if (missingdiv)
      missingdiv.style.display = "none";
    }

  render() {
    return (<div id="mapContainer" className={styles.map}>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    model: state.baseMapModel,
  }
}

export default connect(mapStateToProps)(BaseMap);
