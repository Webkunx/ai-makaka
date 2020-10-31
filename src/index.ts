import { RoomImplementation } from "./domains/room";

const room = new RoomImplementation(100, 100);
room.init();
room.letMonkeyFind(room.box);
room.giveMonkeyABox();
room.letMonkeyFind(room.banana);
room.letMonkeyClimb();
room.giveMonkeyABanana();
