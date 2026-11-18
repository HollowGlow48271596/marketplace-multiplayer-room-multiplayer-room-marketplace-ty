import test from "node:test";
import assert from "node:assert/strict";
import { decideRoom } from "./matchmaking_room.ts";

test("a valid course order is matched to a stable room and handoff event", () => {
  const result = decideRoom({ sellerAsset: "course:typescript-basics", buyerId: "buyer-42", orderId: "order-1001" });
  assert.equal(result.status, "matched");
  assert.equal(result.channel, "order-order-1001");
  assert.deepEqual(result.event, {
    orderId: "order-1001",
    sellerAsset: "course:typescript-basics",
    buyerId: "buyer-42"
  });
});
