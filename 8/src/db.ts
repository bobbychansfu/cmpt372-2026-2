import type { User } from "./app.ts";

// pretend database
const rows: User[] = [
  { fname: "Trini", lname: "Kwan" },
  { fname: "Zack", lname: "Taylor" },
  // ... more rows
];

// FAKE DB helpers! 
export const db = {
  async getUserByName(fname: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 50)); // fake latency
    return rows.find((u) => u.fname === fname) ?? null;
  },
};
