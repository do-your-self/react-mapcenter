import React from 'react';
import {connect} from 'dva';
import styles from './HBDRouter.css';
import BaseMap from '../../components/Map/Map/BaseMap';
class RealTimeBDRouter extends React.Component {

  render() {
    return (
      <div className={styles.normal}>
        <BaseMap></BaseMap>
      </div>
    )
  }
}

export default RealTimeBDRouter;
