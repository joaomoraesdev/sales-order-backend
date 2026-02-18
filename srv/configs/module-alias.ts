import { join } from 'path';
import modulealias from 'module-alias';


modulealias.bind('@', join(__dirname, '..'));