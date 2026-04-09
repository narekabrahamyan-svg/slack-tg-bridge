const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const app = express();
app.use(express.json());

const TG_TOKEN = process.env.TG_TOKEN;
const REDIS_URL = process.env.REDIS_URL;

const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.connect();

// Handle /start from Telegram users
app.post("/tg", async (req, res) => {
  const msg = req.body.message;
  if (msg && msg.text === "/start") {
    const chatId = String(msg.chat.id);
    await redisClient.sAdd("tg_users", chatId);
    await fetch("https://api.telegram.org/bot" + TG_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: "You are now subscribed to DuplicateRadar!" })
    });
  }
  res.sendStatus(200);
});

// Handle Slack messages
app.post("/slack", async (req, res) => {
  if (req.body.type === "url_verification") {
    return res.json({ challenge: req.body.challenge });
  }
  const event = req.body.event;
  if (!event || event.type !== "message" || event.bot_id) {
    return res.sendStatus(200);
  }
  const text = event.text || "(empty message)";
  const msg = "DuplicateRadar: " + text;
  const users = await redisClient.sMembers("tg_users");
  for (const chatId of users) {
    await fetch("https://api.telegram.org/bot" + TG_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: msg })
    });
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bridge running on port " + PORT));
