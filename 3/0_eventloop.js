setTimeout(() => {
    console.log('timeout');
}, 10);

setImmediate(() => {
    console.log('immediate');
});

process.nextTick(() => {
    console.log('nextTick');
});