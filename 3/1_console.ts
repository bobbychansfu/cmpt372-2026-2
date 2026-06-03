console.log("hello");
console.warn("hello");
console.error("hello");

const p: Array<{name:string, age:number}> = [
    {name: "Alice", age: 30},
    {name: "Bob", age: 25}
];

console.table(p);

console.time("myTimer");
setTimeout(() => {
    console.log(console.timeEnd("myTimer"));
}, 1000);

console.log("This is a log message");