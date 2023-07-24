import pkg from 'pg';

import { DB_KEY } from '../config/index.js';

const { Pool } = pkg;

const pool = new Pool({ connectionString: DB_KEY });

export default pool;
