import { EventEmitter } from 'events';

interface PersonEvents {
    poke: [say: string];
    sleep: [];
    move: [x: number, y: number];
}

class Person extends EventEmitter<PersonEvents> {
    name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    }
}

const u1 = new Person("Alice");

u1.on("poke", (say) => {
    console.log(`${u1.name} was poked and says: ${say}`);
});

u1.on("sleep", () => {
    console.log(`${u1.name} is sleeping.`);
});

u1.on("move", (x, y) => {
    console.log(`${u1.name} moved to (${x}, ${y}).`);
});

u1.emit("poke", "Ouch!");
u1.emit("sleep");
u1.emit("move", 10, 20);

// u1.emit("move", 10);