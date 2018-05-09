import React from 'react';
import { Select, Cascader, Slider } from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './ILeftView.less';
import imagelogo from '../../../../assets/Medical/title.png';

const Option = Select.Option;
class ILeftView extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        }
      }
  }

  componentWillMount(){
    this.props.dispatch({
      type:'medicalIndexLeftViewModel/getCityData'
    })
  }
  componentDidMount(){

  }
  clickMedicalTypeHandle=()=>{
  }

	handleChange = (value,title)  => {
		// console.log(value,title);
  }

  postParams=(name,value)=>{

    /***
     * map
     */
    this.props.dispatch({
      type:'medicalIndexMapModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalIndexMapModel/getMedicalIndexMapLayerData'
    })

     /***
     * right
     */
    this.props.dispatch({
      type:'medicalIndexRightViewModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalIndexRightViewModel/getChartsData'
    })

     /***
     * bottom
     */
    this.props.dispatch({
      type:'medicalIndexBottomViewModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalIndexBottomViewModel/getChartsData'
    })
  }

	handleSexChange = (val)  => {
    this.postParams("sex",val);
  }

	handleLevelChange = (val)  => {
    this.postParams("level",val);
  }

	handleCityChange = ([province,city,area])  => {
    if(!province&&!city&&!area){
      this.postParams("province","");
    }
    if(province){
      this.postParams("province",province);
    }
    if(city){
      this.postParams("city",city);
    }
    if(area){
      this.postParams("area",area);
    }
  }

  handleAgeChange = (val)  => {
    this.postParams("agid",val);
  }
  handleTimeChange = (val)  => {
    this.postParams("time",val);
  }
  selectView = (option) => {
    return (
      <Select defaultValue={option.defaultValue} onChange={option.handleChange} className={styles.customSelect}>
        {
          option.data.map((value, key) => {
            return (
              <Option key={value} value={value.value}>{value.name}</Option>
            );
          })
        }
      </Select>
    )
  }
  resetCity=(obj,list)=>{
    if (obj instanceof Array) {
      for (var i = 0; i < obj.length; ++i) {
          list.push({
            value: obj[i],
            label: obj[i]
          })
      }
    } else {
      for (var key in obj) {
        if (obj[key] instanceof Object) {
          var children=[];
          list.push({
            value: key,
            label: key,
            children: children,
          })
          this.resetCity(obj[key],children);
        }
      }
    }
  }

  render() {
    const content = this.props.model;
    const citys=[{
      value: '',
      label: '全国'}];
    this.resetCity(content.city,citys);
    return (
      <div className={styles.backgroundView}>
        <div className={styles.logo}></div>
        <div className={styles.panel}>
          <div className={styles.icon}></div>{this.props.model.title}
          <div className={styles.selectLabel}>城市:</div>
            <Cascader options={citys} onChange={this.handleCityChange} placeholder="请选择城市" changeOnSelect />
          <div className={styles.selectLabel}>医院级别:</div>
          {
            this.selectView({
              defaultValue: "全部",
              handleChange: this.handleLevelChange,
              data: content.level
            })
          }
          <div className={styles.selectLabel}>性别:</div>
          {
            this.selectView({
              defaultValue: "全部",
              handleChange: this.handleSexChange,
              data: content.sex
            })
          }
          <div className={styles.selectLabel}>年龄:</div>
          {
            this.selectView({
              defaultValue: "全部",
              handleChange: this.handleAgeChange,
              data: content.age
            })
          }
          {/* <div className={styles.selectLabel}>时间阶段:</div>
          {
            this.selectView({
              defaultValue: "全部",
              handleChange: this.handleTimeChange,
              data: content.time
            })
          } */}
        </div>
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
