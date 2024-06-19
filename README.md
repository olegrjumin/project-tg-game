# Tapathon: Cyber Guardian

![Tapathon: Cyber Guardian](./poster.jpg)

Welcome to Tapathon: Cyber Guardian ⛨, an interactive defense game.

Your objective is simple: protect your device by tapping to destroy incoming threats and using shields for added protection. The more friends you invite, the stronger your defenses become. Compete for the top spot on the leaderboard and show the world your cyber defense skills.

## Setup

Set env variables

```bash
VITE_CONVEX_URL=
```

Go to [convex.com](https://www.convex.dev/) and create a new project. This will be you backend

```bash
npx convex dev
```

## Setup ngrok for local development

1. Install ngrok globally and create an account on ngrok and get the authtoken

```bash
brew install ngrok/ngrok/ngrok
ngrok config add-authtoken <your_auth_token>
```

2. Start ngrok

Set the domain to the domain created in the ngrok account

```bash
ngrok http --domain=[DOMAIN] https://localhost:5173/

```

3. Go to Telegram Bot Father -> Bot Settings -> Edit menu button URL and set it to the ngrok URL
