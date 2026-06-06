import React, { useEffect, useState } from "react"
import "./fetchstock.css"

const FetchStock = () => {
    const [summary, setSummary] = useState(null)
    const [loading, SetLoading] = useState(null)
    const [ticker, setTicker] = useState("")
    const [error, setError] = useState(null)

    const fetchStock = (symbol) =>
    {
        SetLoading(true)
        setError(null)
        setSummary(null)
        fetch(`http://127.0.0.1:8000/stock/${symbol.toUpperCase().trim()}/summary`)
            .then(res => res.json())
            .then(data => {
                if(data.error) setError(data.error)
                else setSummary(data)
                SetLoading(false)
            })
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter ticker (e.g. AAPL)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchStock(ticker)}
            />
            <button onClick={() => fetchStock(ticker)}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {summary && !loading && (
                <div>
                    <h2>{summary.Name}</h2>
                    <h3>{summary.sector}</h3>
                    <p>CMP: {summary.CMP}</p>
                    <p>PE Ratio: {summary.pe_ratio}</p>
                    <p>Market Cap: {summary.market_cap}</p>
                    <p>52W High: {summary["52_week_high"]}</p>
                    <p>52W Low: {summary["52_week_low"]}</p>
                    <p>Avg Volume: {summary.Avg_Vol}</p>
                </div>
            )}
        </div>
    )
}

export default FetchStock