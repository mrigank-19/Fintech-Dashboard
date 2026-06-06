from fastapi import FastAPI
from pydantic import BaseModel
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

#GET -> Getting information from the server
#POST -> Push smthg new to the server
#PUT -> Change smthg
#DELETE -> deleting stuff

@app.get('/stock/movers')
def getpct_chng(tickers: str):
    slist = tickers.split(',')
    stocks_d = {}
    for i in slist:
        i = i.strip()
        s = yf.Ticker(i)
        d = s.history(period = '2d')
        
        if d.empty or len(d) < 2:
            continue  # Skip this ticker if there isn't enough historical data
            
        try:
            # Safely calculate the percentage change of the last row
            pct_change = d['Close'].pct_change().iloc[-1]
            stocks_d[i] = round(float(pct_change), 2)
        except Exception:
            continue
    
    sorted_results = dict(sorted(stocks_d.items(), key=lambda x: x[1], reverse=True))
    return {"movers" : sorted_results}


@app.get('/stock/{ticker}')
def get_data(ticker: str):
    stock = yf.Ticker(ticker)
    d = stock.history(period='1d')
    price = float(d['Close'].iloc[0])
    return {"Symbol": ticker, "Price": price}

@app.get('/stock/{ticker}/summary')
def get_sum(ticker : str):
    stock = yf.Ticker(ticker)
    sinfo = stock.info
    sdata = stock.history(period = '1y')

    if sdata.empty:
        return {"error": "Ticker not found"}

    return{
        "Name" : sinfo.get("longName", "N/A"),
        "sector": sinfo.get("sector", "N/A"),
        "market_cap": sinfo.get("marketCap", "N/A"),
        "pe_ratio": sinfo.get("trailingPE","N/A"),
        "CMP" : float(sdata['Close'].iloc[-1]),
        "52_week_high" : max(sdata['Close']),
        "52_week_low" : min(sdata['Close']),
        "Avg_Vol" : float(sdata["Volume"].mean())
    }




    
    