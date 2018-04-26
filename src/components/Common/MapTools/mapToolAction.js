import {dasType} from "../../../utils/dasUtils/dasUtils";
import {mapToolTypeConstant} from './MapToolUtils';

export function widgetAction(props, maptToolType) {
  // console.log("props", props);
  let dasTypeState = props.model.dasTypeState;
  switch (dasTypeState) {
    /**
    *医疗
    */
    case dasType.MEDICAL_BASE:
      medicalBaseFunction(props, maptToolType);
      break;

    case dasType.MEDICAL_INDEX:
      medicalIndexFunction(props, maptToolType);

      break;

    /**
    *北斗
    */
    case dasType.BDFISHERY_REALTIME:

      break;

    case dasType.BDFISHERY_HISTORY:

      break;
    default:

  }

}

function medicalBaseFunction(props, maptToolType) {
  //重置位置

  switch (maptToolType) {
    case mapToolTypeConstant.LOCATIONCAMERA:
      props.dispatch({type: 'medicalBaseMapToolModel/setCamera'});

      break;
    case mapToolTypeConstant.ZOOMIN:
      props.dispatch({type: 'medicalBaseMapToolModel/zoomInButtonReducer'});

      break;
    case mapToolTypeConstant.ZOOMOUT:
      props.dispatch({type: 'medicalBaseMapToolModel/zoomOutButtonReducer'});

      break;
    case mapToolTypeConstant.ADDPITCH:
      props.dispatch({type: 'medicalBaseMapToolModel/addPitchMapRotationButtonReducer'});

      break;
    case mapToolTypeConstant.REDUCEPITCH:
      props.dispatch({type: 'medicalBaseMapToolModel/reducePitchMapRotationButtonReducer'});

      break;
    case mapToolTypeConstant.RESETNORTH:
      props.dispatch({type: 'medicalBaseMapToolModel/resetNorthButtonReducer'});
      break;
    default:

  }

}


function medicalIndexFunction(props, maptToolType) {
  //重置位置

  switch (maptToolType) {
    case mapToolTypeConstant.LOCATIONCAMERA:
      props.dispatch({type: 'medicalIndexMapToolModel/setCamera'});

      break;
    case mapToolTypeConstant.ZOOMIN:
      props.dispatch({type: 'medicalIndexMapToolModel/zoomInButtonReducer'});

      break;
    case mapToolTypeConstant.ZOOMOUT:
      props.dispatch({type: 'medicalIndexMapToolModel/zoomOutButtonReducer'});

      break;
    case mapToolTypeConstant.ADDPITCH:
      props.dispatch({type: 'medicalIndexMapToolModel/addPitchMapRotationButtonReducer'});

      break;
    case mapToolTypeConstant.REDUCEPITCH:
      props.dispatch({type: 'medicalIndexMapToolModel/reducePitchMapRotationButtonReducer'});

      break;
    case mapToolTypeConstant.RESETNORTH:
      props.dispatch({type: 'medicalIndexMapToolModel/resetNorthButtonReducer'});
      break;
    default:

  }

}
