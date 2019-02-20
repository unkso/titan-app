import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'titan/registerServiceWorker';
import { getAppContext } from 'titan/titan';
import devConfig from 'titan/config/config.dev';
import prodConfig from 'titan/config/config.prod';
import TitanApp from 'titan/components/core/TitanApp';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAward,
  faStar,
  faInfo,
  faHome,
  faFlag,
  faCalendarAlt,
  faFileAlt,
  faGraduationCap,
  faUsers,
  faTrophy,
  faNewspaper,
  faCog,
  faPowerOff,
  faRandom,
  faShieldAlt,
  faDumbbell,
  faBan,
  faGamepad,
  faUser
} from '@fortawesome/free-solid-svg-icons';

library.add(faAward);
library.add(faStar);
library.add(faInfo);
library.add(faHome);
library.add(faFileAlt);
library.add(faFlag);
library.add(faCalendarAlt);
library.add(faGraduationCap);
library.add(faUsers);
library.add(faNewspaper);
library.add(faTrophy);
library.add(faCog);
library.add(faPowerOff);
library.add(faRandom);
library.add(faShieldAlt);
library.add(faDumbbell);
library.add(faBan);
library.add(faGamepad);
library.add(faUser);

let config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = devConfig;
} else {
  config = prodConfig;
}

const app = getAppContext();
app.mergeConfigSettings(config);

ReactDOM.render(<TitanApp context={app} />, document.getElementById('root'));
registerServiceWorker();
