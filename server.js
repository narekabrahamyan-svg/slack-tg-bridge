const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

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
