import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";


export interface User{ 
    socket: Socket;
    name: string;
}

export class UserManager{ 
    private users: User[]; 
    private queue: string[]; 
    private roomManager: RoomManager;

    constructor(){      // Initialize the users and queue arrays
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager();
    }
    addUser(name: string, socket: Socket){  
        this.users.push({ 
            name, socket
        }) 
        this.queue.push(socket.id); // Add the user to the queue
        this.clearQueue(); // Check if there are enough users in the queue
        this.initHandlers(socket); // Initialize the handlers for the user
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

        if(!user1 || !user2){
            return;
        }

        const room = this.roomManager.createRoom(user1, user1); // Create a room with the two users
    }

    initHandlers(socket: Socket){ // Initialize the handlers for the user
        socket.on("offer", ({sdp, roomId}: {sdp:string, roomId:string})=>{
            this.roomManager.onOffer(roomId, sdp);
        })

        socket.on("answer", ({sdp, roomId}: {sdp:string, roomId:string})=>{
            this.roomManager.onAnswer(roomId, sdp);
        })
    }







}  