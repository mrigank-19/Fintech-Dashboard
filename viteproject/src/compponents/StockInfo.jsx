import React, { useEffect, useState } from "react"

const StockInfo = () => {
  const [summary, setSummary] = useState(null);
  const [loading, SetLoading] = useState(null);
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);

  const stockinfo = (symbol) => {
    SetLoading(true);
    setError(null);
    setSummary(null);
    fetch(`http://127.0.0.1:8000/stock/${symbol.toUpperCase().trim()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setSummary(data);
        SetLoading(false);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticker (e.g. AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && stockinfo(ticker)}
      />
      <button onClick={() => stockinfo(ticker)}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && !loading && (
        <div>
          <h2>{summary.Symbol}</h2>
          <h3>{summary.Price}</h3>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
