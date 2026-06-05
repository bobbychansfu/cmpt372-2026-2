import fs from "fs/promises";

(async () => {
  try {
    const data = await fs.readFile("5_Users.ts", "utf-8");
    console.log(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
})();