import React, { useState, useEffect } from 'react';
import '../css/FinancialGrowthInsights.css';

const FinancialGrowthInsights = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialGrowthInsights = async () => {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 2);
        const formattedDate = yesterday.toISOString().split('T')[0] + "T05:47";
        const response = await fetch(
          `https://api.marketaux.com/v1/news/all?countries=ca&filter_entities=true&limit=3&published_after=${formattedDate}&api_token=C1PgFl8ZcFQnqFCNzjt8cLAwuEp5kEcoygm97xQK`
        );

        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        setNews(data.data || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFinancialGrowthInsights();
  }, []);

  return (
    <div className="insights-container">
      <h2 className="insights-title">📈 Financial Growth Insights</h2>
      {error && <p className="insights-error">{error}</p>}

      {!error && news.length === 0 && <p className="loading-text">Loading insights...</p>}

      <div className="news-grid">
        {news.map((item) => (
          <div key={item.uuid} className="news-card">
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="news-image" />
            )}
            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialGrowthInsights;
