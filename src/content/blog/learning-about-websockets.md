---
title: Learning about WebSockets
description: "A beginner-friendly look at WebSockets: What they are, why they exist, how they work, and their tradeoffs."
pubDate: 2026-09-17
---

Recently, people around me have been talking about a fair bit about WebSockets - so that got me wondering...

## What is a WebSocket?

All I knew was that WebSockets were used when engineers wanted a two way communication channel, but HTTP requests would be bandwidth heavy and have high latency. I had an intuition as to why, but didn't really know the details.

Turns out, WebSocket is just a protocol that supports client-server connections! The main draw is that it supports two-way communication over a single connection that persists. This means unlike the traditional HTTP request/response model - either side could send messages at any time and didn't need to re-establish a connection for it.

Rather than sending complete blocks of information and then closing the connection, WebSockets work by sending smaller frames/messages through a stream via a persistent connection.

<hr />

## So now we know what WebSockets are, but who is using them?

When exchanging data on the internet we typically use the traditional request-response model. This works fine for most content, like recipe websites or blog posts where the data doesn't need to be wrangled live. However, when users want live updates, the client would need to poll (ask) the server `"is there an update?"` every few seconds. This creates a lot of unnecessary traffic, since most requests come back empty.

![Diagram showing standard HTTP request/response](./learning-about-websockets/standard-protocol.png)
_Traditional HTTP request/response cycle_

HTTP requests also carry a lot of header metadata. Though it contains useful context - when communicating frequently, the added bandwidth and latency adds up. WebSockets on the other hand are stateful, and retain this context throughout the connection, so this overhead isn't required, thus saving bandwidth and reducing latency.

> **Why HTTP requests carry header metadata:** HTTP requests contain headers because it describes what it carries (content type, client type, and how to handle the request). HTTP requests are stateless, so this information isn't kept between requests, hence why the client has to send it every time even if it doesn't change.

<hr />

## How do we establish/use a WebSocket?

A WebSocket connection starts with an HTTP upgrade handshake. The client sends an HTTP request that includes a connection upgrade header. If the server accepts, it responds with an HTTP 101 Switching Protocols response, which transforms the connection from HTTP to WebSocket and opens a bidirectional communication channel between client and server.

Once the connection is established, the bulky headers can be omitted, which reduces overhead significantly when messages are exchanged frequently.
![Diagram showing WebSocket persistent connection](./learning-about-websockets/websocket-protocol.png)

<hr />

## What problems do WebSockets bring?

WebSockets sound amazing, but with many things there are pros and cons. The main con is due to the statefulness of the connection which makes it hard to scale. This is because each connection requires resources (CPU and RAM), and since a connection is tied to a specific server instance, load balancing and routing become more difficult.

<hr />

## Alternatives to WebSocket

There are a couple of choices if WebSocket doesn't achieve the features you need.

1. WebTransport - a newer protocol that may take over from WebSocket for many use cases in the future. It supports backpressure, unidirectional streams, out-of-order delivery, and unreliable data transmission.
2. WebSocketStream - WebSocket with a promise-based API that integrates with the Streams API, which gives it native backpressure handling, though this interface isn't widely supported yet.
3. WebRTC - designed for peer to peer connections and built to support voice, video, and generic data!

> **Note:** The standard WebSocket API doesn't support backpressure: the ability for the consumer to signal the producer to slow down. If a client produces messages faster than the server consumes them, buffers fill up, memory usage grows, or CPU usage spikes.

<hr />

## Summary of what I learnt

WebSockets are a way to create persistent, full-duplex channels for real-time communication that reduces latency and avoids the expensive overhead of HTTP polling + headers. However, it comes at a cost: each connection uses server resources, scaling and routing are harder, and it won't fit every use case.
