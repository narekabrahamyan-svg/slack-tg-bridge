{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf2 const express = require("express");\
const fetch = require("node-fetch");\
\
const app = express();\
app.use(express.json());\
\
const TG_TOKEN = process.env.
\f1\fs26 8645976670:AAG72nQNHQDT1bdtOJpiAxcc23uZzEgj0b0
\f0\fs24 ;\
const TG_CHAT_ID = process.env.
\f1\fs26 8460807634
\f0\fs24 \
const SLACK_SECRET = process.env.SLACK_SECRET; // optional verification\
\
app.post("/slack", async (req, res) => \{\
  // Slack URL verification handshake\
  if (req.body.type === "url_verification") \{\
    return res.json(\{ challenge: req.body.challenge \});\
  \}\
\
  const event = req.body.event;\
  if (!event || event.type !== "message" || event.bot_id) \{\
    return res.sendStatus(200);\
  \}\
\
  const text = event.text || "(empty message)";\
  const user = event.user || "unknown";\
  const msg = `\uc0\u55357 \u56552  *Slack message*\\n\u55357 \u56420  User: \\`$\{user\}\\`\\n\u55357 \u56492  $\{text\}`;\
\
  await fetch(`https://api.telegram.org/bot$\{
\f1\fs26 8645976670:AAG72nQNHQDT1bdtOJpiAxcc23uZzEgj0b0
\f0\fs24 \}/sendMessage`, \{\
    method: "POST",\
    headers: \{ "Content-Type": "application/json" \},\
    body: JSON.stringify(\{ chat_id: 
\f1\fs26 8460807634
\f0\fs24 , text: msg, parse_mode: "Markdown" \}),\
  \});\
\
  res.sendStatus(200);\
\});\
\
app.listen(3000, () => console.log("Bridge running on port 3000"));}