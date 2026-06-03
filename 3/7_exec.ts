import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);

(async () => {
    const platform = os.platform();
    console.log(`Running on platform: ${platform}`);

    const fname = process.argv[2] || "Hello";
    const sname = process.argv[3] || "World";

    try {
        const { stdout, stderr } = await execAsync(`sh 7_script.sh ${fname} ${sname}`);
        console.log(stdout);
    } catch (error) {
        console.error(`Error executing script: ${error}`);
    }

    if (platform === 'win32') {
        // win commands
    } else {
        // unix commands
    }
})();