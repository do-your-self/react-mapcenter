import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './IRightView.less';
class IRightView extends React.Component {

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
    model: state.medicalIndexRightViewModel,
  }
}

export default connect(mapStateToProps)(IRightView);
