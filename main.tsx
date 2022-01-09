import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL")!;

const pool = new postgres.Pool(databaseUrl, 3, true);
const connection = await pool.connect();
try {
  await connection.queryObject`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      message TEXT NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `;
} finally {
  connection.release();
}

serve(async (req: Request) => {
  const url = new URL(req.url);
  if (!(url.pathname === "/messages" || (url.pathname === "/messages/like" && url.search.startsWith("?id=")))) {
    return new Response("Not Found", { status: 404 });
  }

  const connection = await pool.connect();

  try {
    switch (req.method) {
      case "GET": {
        // 全メッセージの取得
        const result = await connection.queryObject`
          SELECT * FROM messages
        `;

        const body = JSON.stringify(result.rows, null, 2);

        return new Response(body, {
          headers: { "content-type": "application/json" },
        });
      }

      case "POST": {
        // 新しいメッセージの投稿
        if (url.pathname === "/messages") {
          const unparsedData = await req.json().catch(() => null);
          const { username, message } = JSON.parse(unparsedData)

          await connection.queryObject`
            INSERT INTO messages (username, message) VALUES (${username}, ${message})
          `;

          return new Response("", { status: 201 });
        }

        // メッセージにlikeをつける
        if (url.pathname === "/messages/like") {
          const params = new URLSearchParams(url.search)
          const id = params.get("id")

          await connection.queryObject`
            UPDATE messages SET likes=likes+1 WHERE id=${id}
          `

          return new Response("", { status: 201 });
        }
      }
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }

  } catch (err) {
    console.error(err);
    return new Response(`Internal Server Error\n\n${err.message}`, {
      status: 500,
    });
  } finally {
    connection.release();
  }
});