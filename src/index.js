import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/homeModel/homeModel').default)

//bd
app.model(require('./models/bdModel/bdRealTimeModel').default)
app.model(require('./models/map/bdFisheryMapModel/bdFisheryHistoryMapModel/bdFisheryHistoryMapModel').default)

//medaical
app.model(require('./models/medicalModel/mcLeftMenuModel').default)
app.model(require('./models/medicalModel/mcBaseModel').default)
app.model(require('./models/medicalModel/mcIndexModel').default)

app.model(require('./models/map/medicalMapModel/medicalBaseMapModel/medicalBaseMapModel').default)

app.model(require('./models/map/medicalMapModel/medicalBaseMapModel/medicalBaseMapToolModel').default)
app.model(require('./models/map/medicalMapModel/medicalIndexMapModel/medicalIndexMapToolModel').default)

//map
app.model(require('./models/map/baseMapModel').default)
app.model(require('./models/map/mapToolModel').default)



app.model(require('./models/medicalModel/baseModel/medicalBaseBottomViewModel').default)
app.model(require('./models/medicalModel/baseModel/medicalBaseRightViewModel').default)
app.model(require('./models/medicalModel/baseModel/medicalBaseLeftViewModel').default)

app.model(require('./models/medicalModel/indexModel/medicalIndexBottomViewModel').default)
app.model(require('./models/medicalModel/indexModel/medicalIndexRightViewModel').default)
app.model(require('./models/medicalModel/indexModel/medicalIndexLeftViewModel').default)



// 4. Router
app.router(require('./router').default);


// 5. Start
app.start('#root');
