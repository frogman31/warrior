\# 🛡️ Warrior — Token Tracker \& Trading Dashboard on Zora + Base Feed



\*\*Warrior\*\* is a simple yet powerful token discovery and trading dashboard built for creators and degens on \*\*Zora\*\* and \*\*Base App Feed\*\*.



No noise. No scamcoins. Just real-time tracking of coins minted and shared via \[Zora](https://zora.co/) and the \*\*Base\*\* ecosystem. Powered by Uniswap V4 pools. Made with ❤️ using React + Tailwind + Node.js.



---



\## ⚙️ What It Does



\- ✅ Fetches \*\*Base Feed\*\* and filters only "coined" tokens

\- ✅ Enriches token metadata via \*\*Zora API\*\*

\- ✅ Tracks Uniswap V4 pools where tokens live

\- ✅ Displays all tokens in a \*\*beautiful, sortable dashboard\*\*

\- ✅ Lets you discover and trade them directly from the UI (soon!)



---



\## 🚀 Tech Stack



\- \*\*Frontend\*\*: React + Vite + TailwindCSS

\- \*\*Backend\*\*: Node.js + Express + fetch

\- \*\*APIs\*\*: Zora API, Base App Feed, Uniswap V4

\- \*\*Hosted\*\*: GitHub repo for now



---



\## 📂 Folder Structure

warrior/

├── frontend/ → React dashboard

├── backend/ → Fetch + enrich Base \& Zora data

└── tokens.json → Output JSON of tokens



---



\## 🧪 Local Dev Setup



```bash

\# clone this repo

git clone https://github.com/frogman31/warrior.git

cd warrior



\# install and run backend

cd backend

npm install

node src/index.js



\# run frontend

cd ../frontend

npm install

npm run dev





