var users: string[] = [];

function nextUser(){
    process.stdout.write("Enter your name: ");
}

process.stdin.on('data', (data) => {
    if (data.toString().trim().toLowerCase() === "exit") {
        console.log("Goodbye!");
        process.exit(0);
    } else {
        users.push(data.toString().trim());
        console.log(`Hello, ${data.toString().trim()}!`);
        nextUser();
    }
});

process.on('exit', () => {
    console.log(users.length > 0 ? `Users entered: ${users.join(", ")}` : "No users entered.");
});

nextUser();