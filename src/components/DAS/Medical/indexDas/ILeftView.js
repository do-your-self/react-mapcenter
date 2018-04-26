import React from 'react';
import { Select } from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import "antd/dist/antd.less";
import styles from './ILeftView.less';
const Option = Select.Option;
class ILeftView extends React.Component {
  constructor(props) {
      super(props);
	}
	

  componentWillMount(){

  }
  componentDidMount(){

  }
  clickMedicalTypeHandle=()=>{
  }

	handleChange = (value,title)  => {
		// console.log(value,title);
  }
  
  selectView = (option) => {
    return (
      <Select defaultValue={option.defaultValue} onChange={option.handleChange} className={styles.customSelect}>
        {
          option.data.map((value, key) => {
            return (
              <Option key={value}>{value}</Option>
            );
          })
        }
      </Select> 
    ) 
  }

  render() {
    const content = this.props.model.leftSelectContent;
    return (
      <div className={styles.backgroundView}>
        <img src="/src/assets/Medical/title.png"  className={styles.logo}/>
        <div className={styles.panel}><div className={styles.icon}></div>{this.props.model.title}</div>
        {
          this.selectView({
            defaultValue: "全国",
            handleChange: this.handleChange,
            data: content.city
          })
        }
        {
          this.selectView({
            defaultValue: "三级",
            handleChange: this.handleChange,
            data: content.level
          })
        }
        {
          this.selectView({
            defaultValue: "性别",
            handleChange: this.handleChange,
            data: content.sex
          })
        }
        {
          this.selectView({
            defaultValue: "患者年龄段",
            handleChange: this.handleChange,
            data: content.age
          })
        }
        {
          this.selectView({
            defaultValue: "时间段",
            handleChange: this.handleChange,
            data: content.time
          })
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.medicalIndexLeftViewModel,
  }
}

export default connect(mapStateToProps)(ILeftView);