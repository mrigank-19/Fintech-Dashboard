import React, { useEffect, useState } from "react";

const StockMovers = () => {
  const [summary, setSummary] = useState(null);
  const [loading, SetLoading] = useState(null);
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);

  const stockmovers = (symbol) => {
    SetLoading(true);
    setError(null);
    setSummary(null);
    fetch(`http://127.0.0.1:8000/stock/movers?tickers=${symbol}`)
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
        onKeyDown={(e) => e.key === "Enter" && stockmovers(ticker)}
      />
      <button onClick={() => stockmovers(ticker)}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && !loading && (
        <div style={{ marginTop: "15px" }}>
          <table
            style={{
              borderCollapse: "separate",
              borderSpacing: "0",
              width: "100%",
              maxWidth: "350px",
              border: "1px solid #484747",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#484747",
                  borderBottom: "2px solid #484747",
                }}
              >
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#ffffff",
                  }}
                >
                  Ticker
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "right",
                    fontSize: "14px",
                    color: "#ffffff",
                  }}
                >
                  Daily Change
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.movers).map(
                ([stockSymbol, percentage]) => (
                  <tr
                    key={stockSymbol}
                    style={{ borderBottom: "1px solid #484747" }}
                  >
                    {/* Added generous 24px horizontal padding to space out the columns */}
                    <td
                      style={{
                        padding: "12px 24px",
                        fontWeight: "bold",
                        textAlign: "left",
                        color: "#fff",
                      }}
                    >
                      {stockSymbol}
                    </td>
                    <td
                      style={{
                        padding: "12px 24px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: percentage >= 0 ? "#2e7d32" : "#d32f2f",
                      }}
                    >
                      {percentage >= 0
                        ? `+${(percentage * 100).toFixed(0)}%`
                        : `${(percentage * 100).toFixed(0)}%`}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockMovers;
