import { Socket } from "socket.io";


export interface User{ 
    socket: Socket;
    name: string;
}

export class UserManager{ 
    private users: User[]; 
    private queue: string[]; 

    constructor(){      // Initialize the users and queue arrays
        this.users = [];
    }
    addUser(name: string, socket: Socket){  
        this.users.push({ 
            name, socket
        }) 
        this.queue.push(socket.id); // Add the user to the queue
        this.clearQueue(); // Check if there are enough users in the queue
    }

    removeUser(socketId: string){ // Remove the user from the users array
        this.users = this.users.filter(x => x.socket.id === socketId); // Remove the user from the queue
        this.queue = this.queue.filter(x => x == socketId);
    }

    clearQueue(){ // Check if there are enough users in the queue
        if(this.queue.length < 2){
            return;
        }

        const user1 = this.users.find(x => x.socket.id === this.queue.pop()); // Get the first user from the queue
        const user2 = this.users.find(x => x.socket.id === this.queue.pop()); // Get the first user from the queue
        user1?.socket.emit("new-room", {
            type: "send-offer",
            roomId
        })
    }





}  