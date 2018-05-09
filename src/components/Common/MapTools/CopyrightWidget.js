import React from 'react';
import {connect} from 'dva';
import styles from './CopyrightWidget.less';
import LogoImage from '../../../assets/Logo/logo.png';

class CopyrightWidget extends React.Component {


  render() {
    return (
      <div className={styles.backgroundView}>
        <img className={styles.logoImage} src={LogoImage}></img>
      </div>
    )
  }
}

export default CopyrightWidget;
