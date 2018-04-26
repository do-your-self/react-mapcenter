import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './RightView.less';
class RightView extends React.Component {

  constructor(props) {
      super(props);
  }

  componentWillMount(){
    this.props.dispatch({
      type:'medicalBaseRightViewModel/getLabelData'
    })
  }
  componentDidMount(){
    this.props.dispatch({
      type:'medicalBaseRightViewModel/getChartsData'
    })
  }

  setChartLabel = (id,num) => {
    let container = document.getElementById(id);
    let icon = document.createElement("div");
    let value = document.createElement("div");
    let label = document.createElement("div");
    icon.style.cssText = "float:left;width:100%;height:25px";
    icon.innerText = "丨";
    value.style.cssText = "float:left;width:100%;height:25px";
    value.innerText = num;
    label.style.cssText = "float:left;width:100%;height:25px";
    label.innerText = "治疗率";
    container.appendChild(icon);
    container.appendChild(value);
    container.appendChild(label);
  }

  listView = () => {
    console.log(this.props)
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
        marginBottom: "7px",
        border: "solid 1px #202f35"
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
    model: state.medicalBaseRightViewModel,
  }
}

export default connect(mapStateToProps)(RightView);
