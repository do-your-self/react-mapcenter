import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HomePage from './routes/HomePage';

import RealTimeBDRouter from './routes/BDFisheryRouter/RealTimeBDRouter';
import HBDRouter from './routes/BDFisheryRouter/HBDRouter';

// import MCRouter from './routes/MCRouter/MCRouter';
import MCBaseRouter from './routes/MCRouter/MCBaseRouter';
import MCIndexRouter from './routes/MCRouter/MCIndexRouter';
import MCLeftMenuRouter from './routes/MCRouter/MCLeftMenuRouter';



function RouterConfig({ history }) {
  console.log("history",history);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* 北斗渔业  */}
        <Route path="/bdrealtimedata" component={RealTimeBDRouter}></Route>
        <Route path="/bdhdata" component={HBDRouter}></Route>
        {/* 医疗 */}
        <div>
          {/* <Route path="/medical" component={MCRouter}></Route> */}
          <Route path="/medical" component={MCLeftMenuRouter}></Route>
          <Route path="/medical/medicalbasedata" component={MCBaseRouter}></Route>
          <Route path="/medical/medicalindexdata" component={MCIndexRouter}></Route>
        </div>

        {/*  */}

      </Switch>
    </Router>
  );
}

export default RouterConfig;
