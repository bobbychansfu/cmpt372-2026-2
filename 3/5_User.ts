export interface UserData {
    id: number;
    name: string;
    email: string;
    age: number;
}

export class User {
    private data: UserData;

    constructor(id: number, name: string, email: string, age: number) {
        this.data = { id, name, email, age };
    }

    changeName(newName: string): void {
        this.data.name = newName;
    }
}