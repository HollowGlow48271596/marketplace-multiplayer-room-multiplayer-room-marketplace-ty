import { decideRoom } from "./matchmaking_room.ts";
import { InfraiRealtime } from "./infrai_realtime.ts";

const input = { sellerAsset: "course:typescript-basics", buyerId: "buyer-42", orderId: "order-1001" };
const decision = decideRoom(input);
console.log(JSON.stringify(decision, null, 2));

const key = process.env.INFRAI_API_KEY;
if (key) {
  const infrai = new InfraiRealtime(key);
  await infrai.createChannel(decision.channel);
  await infrai.publish(decision.channel, "order.handoff", decision.event, "seller-marketplace");
  console.log("room state published");
} else {
  console.log("Set INFRAI_API_KEY to publish this room state.");
}
