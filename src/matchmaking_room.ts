import { z } from "zod";

export const roomRequest = z.object({
  sellerAsset: z.string().min(1),
  buyerId: z.string().min(1),
  orderId: z.string().min(1)
});

export type RoomRequest = z.infer<typeof roomRequest>;

export type RoomDecision = {
  status: "matched" | "waiting";
  channel: string;
  event: { orderId: string; sellerAsset: string; buyerId: string };
};

export function decideRoom(input: unknown): RoomDecision {
  const request = roomRequest.parse(input);
  return {
    status: "matched",
    channel: `order-${request.orderId}`,
    event: { orderId: request.orderId, sellerAsset: request.sellerAsset, buyerId: request.buyerId }
  };
}
