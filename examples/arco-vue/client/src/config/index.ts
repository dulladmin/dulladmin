import { omitBy } from 'lodash';
import config from './config.json';

export default {
  'app.creationDate': null,
  'app.topMenu': false,
  'app.menuAccordion': false,

  ...omitBy(config, (v) => v == null),
};
