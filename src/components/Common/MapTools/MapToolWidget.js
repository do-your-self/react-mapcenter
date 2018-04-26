import React from 'react';
import {connect} from 'dva';
import {widgetAction} from "./mapToolAction";
import {mapToolTypeConstant} from './MapToolUtils';
import styles from './MapToolWidget.less';

class MapToolWidget extends React.Component {
  constructor(props) {
      super(props);
  }


  zoomInButton = () => {
    widgetAction(this.props,mapToolTypeConstant.ZOOMIN);
  }
  zoomOutButton = () => {
    widgetAction(this.props,mapToolTypeConstant.ZOOMOUT);
  }
  addPitchMapRotationButton = () => {
    widgetAction(this.props,mapToolTypeConstant.ADDPITCH);
  }
  reducePitchMapRotationButton = () => {
    widgetAction(this.props,mapToolTypeConstant.REDUCEPITCH);
  }
  locationCameraButton = () => {
    widgetAction(this.props,mapToolTypeConstant.LOCATIONCAMERA);
  }

  render() {
    return (
      <div className={styles.mapNavigation}>
        <div className={styles.localize} onClick={this.locationCameraButton}/>
        <div className={styles.amplification} onClick={this.zoomInButton}/>
        <div className={styles.narrow} onClick={this.zoomOutButton}/>
        <div className={styles.OnTheBack} onClick={this.addPitchMapRotationButton} />
        <div className={styles.UnderTheBack} onClick={this.reducePitchMapRotationButton} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: state.mapToolModel,
  }
}

export default connect(mapStateToProps)(MapToolWidget);
