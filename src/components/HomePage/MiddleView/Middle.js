import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './Middle.css';
import Card from './Card';
import {dasType} from '../../../utils/dasUtils/dasUtils';
import {listJSON} from '../../../utils/homeListJSON/dasList';
class Middle extends React.Component {


  constructor(props) {
      super(props);
  }

 addListView=(currentThis)=>{

   const arrayDas = listJSON.list;
   const ListView = arrayDas.map(function(elem, index) {
     return <Card
       key={index+"home"}
       title={elem.name}
       des={elem.desc}
       onClickDasLook={currentThis.clickDasLook.bind(currentThis,elem)}
       ></Card>;
   })

   return ListView;

   }

  clickDasLook=(elem)=>{
    // alert(JSON.stringify(elem))
    const type = elem.type;
    // console.log("this.props",this.props);
     switch (type) {
       case dasType.BDFISHERY_REALTIME:

         this.props.dispatch(routerRedux.push('/bdrealtimedata'));

         break;
       case dasType.BDFISHERY_HISTORY:

         this.props.dispatch(routerRedux.push('/bdhdata'));

       break;
       case dasType.MEDICAL_BASE:
         console.log("this.props",this.props);
          // this.props.dispatch(routerRedux.push('/medical'));
          this.props.dispatch(routerRedux.push('/medical/medicalbasedata'));
          // this.props.history.push('/medical/medicalbasedata');

       break;
       default:

     }
  }


  render() {
    return (
      <div className={styles.backgroundView}>
        {
          this.addListView(this)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    model: state.homeModel,
  }
}

export default connect(mapStateToProps)(Middle);
