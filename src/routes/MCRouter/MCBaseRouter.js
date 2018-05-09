import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './MCBaseRouter.css';
import {dasType} from "../../utils/dasUtils/dasUtils";
import BaseMap from '../../components/Map/Map/BaseMap';
import MCLeftMenu from '../../components/DAS/Medical/MCLeftMenu';

import LeftView from '../../components/DAS/Medical/baseDas/LeftView';
import BottomView from '../../components/DAS/Medical/baseDas/BottomView';
import RightView from '../../components/DAS/Medical/baseDas/RightView';

import CompassWidget from '../../components/Common/MapTools/CompassWidget';
import MapToolWidget from '../../components/Common/MapTools/MapToolWidget';
import CopyrightWidget from '../../components/Common/MapTools/CopyrightWidget';





class MCBaseRouter extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){

    this.props.dispatch({type:'mcLeftMenuModel/changeSelectMenuReducer',payload:dasType.MEDICAL_BASE})
    this.props.dispatch({type:'baseMapModel/changeDasTypeReducer',payload:dasType.MEDICAL_BASE})
    this.props.dispatch({type:'mapToolModel/changeDasTypeReducer',payload:dasType.MEDICAL_BASE})


    this.props.dispatch({type:'medicalBaseMapModel/getMedicalBaseMapLayerData',payload:"xxxx"})
  



  }
  componentWillUnmount(){
    // alert("222")
    console.log("mcBaseModel",this.props);
    if (this.props.history.action == "POP") {
      // this.props.dispatch(routerRedux.goBack('/home'));
      // this.props.history.goBack('/')
    }


  }
  render() {
    return (
      <div className={styles.normal}>
        {/* <MCLeftMenu></MCLeftMenu> */}
        <BaseMap></BaseMap>
        <LeftView></LeftView>
        <BottomView></BottomView>
        <RightView></RightView>

        <CompassWidget></CompassWidget>
        <MapToolWidget></MapToolWidget>
        <CopyrightWidget></CopyrightWidget>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.mcBaseModel,
  }
}
export default connect(mapStateToProps)(MCBaseRouter);
