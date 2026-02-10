/**
 * Vercel Serverless tRPC Handler
 *
 * This file creates a serverless function endpoint for tRPC on Vercel.
 * It handles all tRPC procedure calls through the /api/trpc/* route.
 *
 * @module api/trpc/[trpc]
 * @category API - Backend
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Import context and router from server index
import { createContext, appRouter } from "../../src/server";

/**
 * Main handler for Vercel serverless function
 * Converts Vercel Request/Response to Fetch API format for tRPC
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract the tRPC path from the URL
  const path = req.url?.replace(/^\/api\/trpc\/?/, "") || "";

  // Convert Vercel request to Fetch API Request
  const url = new URL(
    path,
    `https://${req.headers.host || "localhost:3000"}/api/trpc`,
  );

  // Copy query parameters
  if (req.url) {
    const searchParams = new URL(req.url, "http://localhost").searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  // Build headers
  const headers = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) {
      const headerValue = Array.isArray(value)
        ? value.join(", ")
        : String(value);
      headers.set(key, headerValue);
    }
  });

  // Build fetch request
  const fetchRequest = new Request(url.toString(), {
    method: req.method || "GET",
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
  });

  // Handle the tRPC request
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: fetchRequest,
    router: appRouter,
    createContext,
    onError({ error, type, path }) {
      console.error(`❌ tRPC Error [${type}] on path: ${path}`);
      console.error(error);
    },
  });

  // Convert Fetch Response back to Vercel Response
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.status(response.status);

  if (response.body) {
    const text = await response.text();
    res.send(text);
  } else {
    res.end();
  }
}
