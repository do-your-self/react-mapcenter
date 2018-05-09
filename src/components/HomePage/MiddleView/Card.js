import React from 'react';
import {connect} from 'dva';
import styles from './Card.css';
import dasImage from '../../../assets/home/das.png';
class XCard extends React.Component {

  render() {
    return (
      <div className={styles.tile} style={this.props.style}>
        <img src={dasImage} onClick={this.props.onClickDasLook}/>
        <div className={styles.infomationView}>
          <h1>{this.props.title}</h1>
          <h2>{this.props.des}</h2>
        </div>
      </div>
    )
  }
}

export default XCard;
