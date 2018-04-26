import React from 'react';
import { connect } from 'dva';
import styles from './HomePage.css';
import Header from '../components/HomePage/HeaderView/Header';
import Middle from '../components/HomePage/MiddleView/Middle';


function HomePage() {
  return (
    <div className={styles.normal}>
      <Header></Header>
      <Middle></Middle>
    </div>
  );
}

HomePage.propTypes = {
};

export default connect()(HomePage);
