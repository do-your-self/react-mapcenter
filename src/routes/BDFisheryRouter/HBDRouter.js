import React from 'react';
import {connect} from 'dva';
import styles from './HBDRouter.css';
import BaseMap from '../../components/Map/Map/BaseMap';
import {dasType} from "../../utils/dasUtils/dasUtils";

class RealTimeBDRouter extends React.Component {

  constructor(props) {
      super(props);
  }

 componentDidMount(){
   this.props.dispatch({type:'bdFisheryHistoryMapModel/getBDMapLayerData',payload:1})
   this.props.dispatch({type:'baseMapModel/changeDasTypeReducer',payload:dasType.BDFISHERY_HISTORY})

 }


  render() {
    return (
      <div className={styles.normal}>
        <BaseMap></BaseMap>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    model: state.bdFisheryMapModel,
  }
}

export default connect(mapStateToProps)(RealTimeBDRouter);
