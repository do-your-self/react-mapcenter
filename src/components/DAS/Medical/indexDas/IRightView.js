import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './IRightView.less';
class IRightView extends React.Component {

  constructor(props) {
      super(props);
  }
  componentDidMount(){
    this.props.dispatch({
      type:'medicalIndexRightViewModel/getChartsData'
    })
  }


  listView = () => {
    let content = this.props.model.rightChartContent;
    let currentThis = this;
    if (content === null) {
      return null;
    }
    let NewWidth = content.Scales.split(":");
    let scalesAnd = 0;
    for (let i = 0; i < NewWidth.length; i++) {
      scalesAnd += parseInt(NewWidth[i]);
    }
    let xwidthAnd = [];
    for (let j = 0; j < NewWidth.length; j++) {
      let xwidth = parseInt(NewWidth[j]) / scalesAnd * 100 + "%";
      xwidthAnd.push(xwidth);
    }
    let listView = content.Charts.map(function(content, elem) {
      let style = {
        width: "100%",
        height: xwidthAnd[elem],
        marginBottom: "7px"
        // cursor:"pointer"
      }

      return (
        <div key={"lqq" + elem} style={style}>
          <div id={content.id} className={styles.chartView}></div>
        </div>
      )
    })
    return listView;
  }

  render() {
    return (
      <div className={styles.backgroundView}>
        {this.listView()}
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
