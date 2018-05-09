import React from 'react';
import {connect} from 'dva';
import styles from './CompassWidget.less';
import {widgetAction} from "./mapToolAction";
import {mapToolTypeConstant} from './MapToolUtils';


class CompassWidget extends React.Component {

  constructor(props) {
      super(props);
  }

  resetNorthButton = () => {
    widgetAction(this.props,mapToolTypeConstant.RESETNORTH);
  }

  render() {
    return (
      <div className={styles.mapCompass}>
        <div id="mapCompass" className={styles.BehindThe} onClick={this.resetNorthButton}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.mapToolModel,
  }
}
export default connect(mapStateToProps)(CompassWidget);
