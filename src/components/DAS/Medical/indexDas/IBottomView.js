import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './IBottomView.less';
class IBottomView extends React.Component {

  constructor(props) {
      super(props);
  }
  componentDidMount(){
    // this.props.dispatch(routerRedux.push('/medical/medicalbasedata'));
  }
  clickMedicalTypeHandle=()=>{

  }
  render() {
    return (
      <div className={styles.backgroundView}>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.medicalIndexBottomViewModel,
  }
}

export default connect(mapStateToProps)(IBottomView);
