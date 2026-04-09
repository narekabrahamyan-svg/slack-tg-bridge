const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TG_TOKEN = process.env.8645976670:AAG72nQNHQDT1bdtOJpiAxcc23uZzEgj0b0;
const TG_CHAT_ID = process.env.8460807634;

app.post("/slack", async (req, res) => {
  if (req.body.type === "url_verification") {
    return res.json({ challenge: req.body.challenge });
  }

  const event = req.body.event;
  if (!event || event.type !== "message" || event.bot_id) {
    return res.sendStatus(200);
  }

  const text = event.text || "(empty message)";
  const user = event.user || "unknown";
  const msg = "Slack message\nUser: " + user + "\n" + text;

  await fetch("https://api.telegram.org/bot" + TG_TOKEN + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg }),
  });

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Bridge running on port 3000"));
  res.sendStatus(200);\
\});\
\
app.listen(3000, () => console.log("Bridge running on port 3000"));}
