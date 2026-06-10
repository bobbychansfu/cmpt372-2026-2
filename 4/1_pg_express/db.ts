import { Pool } from 'pg';

const pool: Pool = new Pool({connectionString: 'postgresql://postgres:root@localhost:5432/cmpt372users'});

const helpers = {

};

export { helpers };