import React from 'react';
import {connect} from 'dva';
import styles from './MCRouter.css';
import MCLeftMenu from '../../components/DAS/Medical/MCLeftMenu';
class MCRouter extends React.Component {

  render() {
    return (
      <div className={styles.normal}>
        <MCLeftMenu></MCLeftMenu>
      </div>
    )
  }
}

export default MCRouter;
