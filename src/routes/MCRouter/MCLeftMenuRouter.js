import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {dasType} from "../../utils/dasUtils/dasUtils";
import image1 from '../../assets/Medical/image1.png';
import image2 from '../../assets/Medical/image2.png';

import styles from './MCLeftMenuRouter.less';
class MCLeftMenuRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // alert(browserHistory.getCurrentLocation().pathname)
    // console.log("hashHistory",this.props);
    window.addEventListener('hashchange', function(ev) {
      // console.log("hashchange", ev);
    });
  }

  clickListHandle = (elem) => {
    // alert(elem.type)
    this.props.dispatch({type: 'mcLeftMenuModel/changeSelectMenuReducer', payload: elem.type})
    switch (elem.type) {
      case dasType.MEDICAL_BASE:
        // this.props.dispatch(routerRedux.push('/medical/medicalbasedata'));
        this.props.history.push('/medical/medicalbasedata');
        break;
      case dasType.MEDICAL_INDEX:
        // this.props.dispatch(routerRedux.push('/medical/medicalindexdata'));
        this.props.history.push('/medical/medicalindexdata');
        break;
      default:

    }
  }

  addListView = () => {
    let currentThis = this;
    const array = [
      {
        type: dasType.MEDICAL_BASE,
        icon: image1,
        title: "出院带药现状及趋势"
      }, {
        type: dasType.MEDICAL_INDEX,
        icon: image2,
        title: "十项指标数据"
      }
    ]
    let currentSelectState = this.props.model.selectMenuState;
    let listView = array.map(function(elem, index) {
      let styleName = null;
      if (currentSelectState == elem.type) {
        styleName = styles.listView;
      } else {
        styleName = styles.listBottomView;
      }
      return <div key={index + "list"} className={styleName} onClick={currentThis.clickListHandle.bind(currentThis, elem)}>
        <img className={styles.iconView} src={elem.icon}></img>
        <div className={styles.titleView}>{elem.title}</div>
      </div>;
    })

    return listView;
  }
  render() {
    return (
      <div className={styles.leftView}>
        <div className={styles.logo}></div>
        {
          this.addListView()
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {model: state.mcLeftMenuModel}
}

export default connect(mapStateToProps)(MCLeftMenuRouter);
