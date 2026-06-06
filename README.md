# Fintech Dashboard

A full-stack financial analytics dashboard built with FastAPI and React.

## Features
- Stock summary — name, sector, PE ratio, market cap, 52W high/low
- Stock price lookup
- Top movers — tracks daily % change across multiple tickers

## Tech Stack
- **Backend:** Python, FastAPI, yfinance
- **Frontend:** React, Vite

## How to Run

### Backend
```bash
cd backend
pip install fastapi uvicorn yfinance
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- `GET /stock/{ticker}` — current price
- `GET /stock/{ticker}/summary` — full stock summary
- `GET /stock/movers?tickers=AAPL,TSLA,MSFT` — daily % change
