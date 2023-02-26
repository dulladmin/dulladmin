import { omitBy } from 'lodash';
import config from './config.json';

export default {
  'app.creationDate': null,

  ...omitBy(config, (v) => v == null),
};
