import { UserData, User } from './5_User';

let u1 = new User(1, "Alice", "alice@example.com", 30);
console.log(u1);

u1.changeName("Alice Smith");
console.log(u1);