import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";

k.scene("room1", () => room1(k));

k.go("room1");