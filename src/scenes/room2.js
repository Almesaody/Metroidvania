import {setBackgoundColor} from "./roomUtils.js";

export function room2(k, roomData) {
    setBackgoundColor(k, "#a2aed5");

    k.camScale(4);
    k.camPos(170, 270);
    k.setGravity(1000);
}