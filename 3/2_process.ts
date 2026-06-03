console.log(process.argv);

const port: string | undefined = process.argv[2] || "3000";

if (port === undefined) {
    console.error("Port number is not provided");
    process.exit(1);
}