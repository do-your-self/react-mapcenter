import React from 'react';
import { Select, Cascader } from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './LeftView.less';

const Option = Select.Option;
class LeftView extends React.Component {
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
      type:'medicalBaseLeftViewModel/getCityData'
    })
  }
  componentDidMount(){
    // this.props.dispatch({
    //   type:'medicalBaseLeftViewModel/getCityData'
    // })

  }
  clickMedicalTypeHandle=()=>{
  }

  postParams=(name,value)=>{
    this.props.dispatch({
      type:'medicalBaseMapModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalBaseMapModel/getMedicalBaseMapLayerData'
    })

     /***
     * right
     */
    this.props.dispatch({
      type:'medicalBaseRightViewModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalBaseRightViewModel/getChartsData'
    })

     /***
     * bottom
     */
    this.props.dispatch({
      type:'medicalBaseBottomViewModel/getParamsReducer',
      payload: {
        name,value
      }
    })
    this.props.dispatch({
      type:'medicalBaseBottomViewModel/getChartsData'
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
          <div className={styles.icon}></div>{content.title}
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
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    model: state.medicalBaseLeftViewModel,
  }
}

export default connect(mapStateToProps)(LeftView);
