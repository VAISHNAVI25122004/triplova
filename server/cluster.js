const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`[CLUSTER] Primary ${process.pid} is running`);
    console.log(`[CLUSTER] Setting up ${numCPUs} workers for handling high concurrency (10,000+ users)`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`[CLUSTER] Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // Start Express server inside worker
    require('./server.js');
    console.log(`[CLUSTER] Worker ${process.pid} started and loaded server.js`);
}
