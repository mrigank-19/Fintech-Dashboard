import React, { useState } from "react"
// Added explicit extensions to prevent Vite path resolution errors
import FetchStock from "./fetchstock.jsx" 
import StockInfo from "./StockInfo.jsx" 
import StockMovers from "./StockMovers.jsx" 

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("home")

    if (activeTab === "home") {
        return (
            <div style={styles.menuContainer}>
                <h1 style={styles.title}>Financial Analytics Dashboard</h1>
                <p style={styles.subtitle}>Select a module below to start tracking real-time market data</p>
                
                <div style={styles.buttonGrid}>
                    <button style={styles.cardBtn} onClick={() => setActiveTab("stock-summary")}>
                        <div style={styles.icon}>🇺🇸</div>
                        <h3>Stock Summary</h3>
                        <span>Fetch Stock Summary</span>
                    </button>

                    <button style={styles.cardBtn} onClick={() => setActiveTab("stock-info")}>
                        <div style={styles.icon}>🇮🇳</div>
                        <h3>Stock Info</h3>
                        <span>Fetch Info About Stocks</span>
                    </button>

                    <button style={styles.cardBtn} onClick={() => setActiveTab("stock-movers")}>
                        <div style={styles.icon}>✨</div>
                        <h3>Stock Movers</h3>
                        <span>Stocks Moving</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.screenContainer}>
            <div style={styles.topBar}>
                <button style={styles.backBtn} onClick={() => setActiveTab("home")}>
                    ← Back to Dashboard
                </button>
            </div>

            <div style={styles.contentArea}>
                {activeTab === "stock-summary" && <FetchStock />}
                {activeTab === "stock-info" && <StockInfo />}
                {activeTab === "stock-movers" && <StockMovers />}
            </div>
        </div>
    )
}

const styles = {
    menuContainer: { maxWidth: "900px", margin: "80px auto", padding: "0 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" },
    title: { fontSize: "32px", color: "#1a1a1a", marginBottom: "10px" },
    subtitle: { color: "#666", marginBottom: "40px" },
    buttonGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" },
    cardBtn: { backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "30px 20px", cursor: "pointer", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
    icon: { fontSize: "40px", marginBottom: "15px" },
    screenContainer: { fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#000000" },
    topBar: { backgroundColor: "#ffffff", borderBottom: "1px solid #e0e0e0", padding: "15px 40px" },
    backBtn: { backgroundColor: "#f0f0f0", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    contentArea: { padding: "40px", maxWidth: "800px", margin: "0 auto" }
}

export default Dashboard
