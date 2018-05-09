import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MCIndexRouter.css';
import {dasType} from "../../utils/dasUtils/dasUtils";

import BaseMap from '../../components/Map/Map/BaseMap';
import ILeftView from '../../components/DAS/Medical/indexDas/ILeftView';
import IBottomView from '../../components/DAS/Medical/indexDas/IBottomView';
import IRightView from '../../components/DAS/Medical/indexDas/IRightView';

import CompassWidget from '../../components/Common/MapTools/CompassWidget';
import MapToolWidget from '../../components/Common/MapTools/MapToolWidget';
import CopyrightWidget from '../../components/Common/MapTools/CopyrightWidget';

class MCIndexRouter extends React.Component {
  constructor(props) {
      super(props);
  }
  componentDidMount(){
    this.props.dispatch({type:'mcLeftMenuModel/changeSelectMenuReducer',payload:dasType.MEDICAL_INDEX})
    this.props.dispatch({type:'baseMapModel/changeDasTypeReducer',payload:dasType.MEDICAL_INDEX})
    this.props.dispatch({type:'mapToolModel/changeDasTypeReducer',payload:dasType.MEDICAL_INDEX})

    this.props.dispatch({type:'medicalIndexMapModel/getMedicalIndexMapLayerData',payload:"xxxx"})

  }
  componentWillUnmount(){
    // alert("111")
    // console.log("mcIndexModel",this.props);
    if (this.props.history.action == "POP") {
      // this.props.dispatch(routerRedux.goBack('/home'));
      // this.props.history.goBack('/')
    }
  }
  render() {
    return (
      <div className={styles.normal}>
        <BaseMap></BaseMap>
        <ILeftView></ILeftView>
        <IBottomView></IBottomView>
         <IRightView></IRightView>

        <CompassWidget></CompassWidget>
        <MapToolWidget></MapToolWidget>
        <CopyrightWidget></CopyrightWidget>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.mcIndexModel,
  }
}
export default connect(mapStateToProps)(MCIndexRouter);
