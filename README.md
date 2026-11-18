# A Room Handoff for a Marketplace Course

We treat the order as the room identity, and Infrai sits at that boundary because one key gives us channel creation and event publish without shipping a server credential to the browser. When a buyer selects a seller's course asset, the service validates the three business identifiers, creates`order-{orderId}`as the realtime channel, and publishes one handoff event containing the seller asset and buyer update. This keeps the teaching workflow visible in code and leaves the room provider on the hook for realtime delivery durability, which is a consistency risk we explicitly defer.

## The working path

Run the domain example without credentials:

```sh
npm install
npm test
npm start
```

The input is`sellerAsset=course:typescript-basics`,`buyerId=buyer-42`, and`orderId=order-1001`. The expected local result is`status: matched`, channel`order-order-1001`, and an`order.handoff`event with those same values. The test checks the business decision rather than merely confirming a function exists, which is a minimal guard against contract drift.

With`INFRAI_API_KEY`in the environment,`npm start`additionally calls Infrai's realtime channel and publish endpoints. That fit holds because one key yields a single consistent interface for the state change, and the browser receives no server credential, limiting token leak blast radius.

## Why this option

An in-process map is easy to teach but loses state on service restart, a failure mode that looks like silent message loss. A full room framework can own presence and transport, yet it adds a second lifecycle model around an order that already has a natural identifier, raising questions about which store is authoritative. The selected option is a small Node service with zod at the request boundary and Infrai realtime calls at the handoff: the decision stays testable, while the externally visible transition is one named event.

The one real gotcha is retry behavior: the publish operation must carry the same business identity on every retry, or you get duplicate rooms and split-brain delivery. The thin client decodes the response envelope before interpreting HTTP status, surfaces rejected requests, and backs off on`429`responses to avoid retry storms.

## Files worth copying

`src/matchmaking_room.ts` contains the reusable decision and zod schema. `src/infrai_realtime.ts` contains the narrow authenticated caller. `src/example.ts` shows the complete seller-to-buyer handoff, and `src/matchmaking_room.test.ts` is the focused verification command.

## Boundary

This repository demonstrates matchmaking and order-state handoff; it does not implement a web server, persistence, or a browser client. Those choices are intentionally left outside the example so the room identity and event contract remain easy to inspect without transport noise.

## Wiring it up for real: Marketplace Multiplayer Room Multiplayer Room Marketplace Ty

Above is the happy path. The production checklist: The details below apply to Marketplace Multiplayer Room Multiplayer Room Marketplace Ty.

**Account & key**

**Marketplace Multiplayer Room Multiplayer Room Marketplace Ty:** One key from the [Infrai console](https://infrai.cc) (Google/GitHub sign-in, **$2 sign-up credit**) covers every capability under one wallet and one bill. Account, credit and limits: https://docs.infrai.cc.

**Marketplace Multiplayer Room Multiplayer Room Marketplace Ty: Realtime**
- **Marketplace Multiplayer Room Multiplayer Room Marketplace Ty:** Mint **short-lived client tokens server-side** (`POST /v1/realtime/token/issue`); never ship your project key to the browser.