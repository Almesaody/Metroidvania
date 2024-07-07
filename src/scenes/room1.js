import { makePlayer } from "../entities/player";
import {
    setMapColliders,
    setBackgoundColor,
    setCameraZones,
} from "./roomUtils.js"

export async function room1(k, room1Data, previousSceneData) {
    setBackgoundColor(k, "#a2aed5");

    k.camScale(4);
    k.camPos(170, 100);
    k.setGravity(1000);

    const roomLayers = roomData.layers;

    const map = k.add([k.pos(0, 0), k.sprite("room1")]);
    const colliders = roomLayers[4].objects;

    setMapColliders(k, map, colliders);

    const player = k.add(makePlayer(k));

    k.onUpdate(() => {
        if (map.pos.x + 160 > player.pos.x) {
            camPos(map.pos.x + 160, k.camPos().y);
            return;
        }

        if (player.pos.x > map.pos.x + roomData.width * roomData.tilewidth - 160) {
            k.camPos (
                map.pos.x + roomData.width * roomData.tilewidth - 160,
                k.camPos().y
            );
            return;
        }
        k.camPos(player.pos.x, k.camPos().y);
    });

    const positions = roomLayers[5].objects;
    for (const position of positions) {
        if (position.name === "player") {
            player.setPosition(position.x + map.pos.x, position.y + map.pos.y);
            player.setControls();
            player.enablePassthrough();
            continue;
        }
    }

    const cameras = roomLayers[6].objects;
    
    setCameraZones(k, map, cameras);

    const exists = roomLayers[7].objects;
    for (const exit of exists) {
        const exitZone = map.add([
            k.pos(edit.x, edit.y),
            k.area({
                shape: new k.Rect(k.vec2(0), exit.width, exit.height),
                collisionIgnore: ["collider"],
            }),
            k.body({isStatic: true}),
            exit.name,
        ]);

        exitZone.onCollide("player", () => {
            k.go("room2", {exitName: exit.name});
        });
    }
}