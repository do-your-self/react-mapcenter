import React from 'react';
// import {connect} from 'dva';
import styles from './Header.css';

class Header extends React.Component {

  render() {
    return (
      <div className={styles.backgroundView}>
        DataEye-Enterprise-Case
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     model: state.bdLegendModel,
//   }
// }

export default Header;
