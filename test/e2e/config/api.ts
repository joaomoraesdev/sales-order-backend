import cds from '@sap/cds';
import { resolve } from 'path';

const rootDir = resolve(__dirname, '..', '..', '..');
const api = cds.test(rootDir);
api.axios.defaults.auth = { username: 'joao', password: '@Teste123' };

export { api };
