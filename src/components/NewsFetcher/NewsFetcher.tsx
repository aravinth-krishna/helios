"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import styles from "./NewsFetcher.module.css";

interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage: string;
}

// Helper to truncate text
const truncate = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

// Helper to compute date range based on a time period
const getDateRange = (timePeriod: string): { from?: string; to?: string } => {
  const today = new Date();
  switch (timePeriod) {
    case "today": {
      const dateStr = today.toISOString().split("T")[0];
      return { from: dateStr, to: dateStr };
    }
    case "week": {
      // Assume week starts on Monday
      const day = today.getDay(); // Sunday is 0, Monday is 1
      const diffToMonday = day === 0 ? 6 : day - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return {
        from: monday.toISOString().split("T")[0],
        to: sunday.toISOString().split("T")[0],
      };
    }
    case "month": {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        from: from.toISOString().split("T")[0],
        to: to.toISOString().split("T")[0],
      };
    }
    case "year": {
      const from = `${today.getFullYear()}-01-01`;
      const to = `${today.getFullYear()}-12-31`;
      return { from, to };
    }
    default:
      return {};
  }
};

const NewsFetcher: React.FC = () => {
  // Set initial query to include multiple keywords using the OR operator.
  const [query, setQuery] = useState<string>(
    "solar panel OR solar energy OR photovoltaic"
  );
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevancy");
  const [sources, setSources] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = "fcdefc09d30b45dcb7ac3940e8da126d"; // Replace with your actual API key
        let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=${apiKey}`;

        // Append date filtering if a specific time period is selected
        if (timePeriod !== "all") {
          const { from, to } = getDateRange(timePeriod);
          if (from && to) {
            url += `&from=${from}&to=${to}`;
          }
        }

        // Append sorting and sources filters if provided
        if (sortBy) url += `&sortBy=${sortBy}`;
        if (sources) url += `&sources=${sources}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch news: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setNews(
          data.articles.filter(
            (article: Article) =>
              article.title &&
              article.description &&
              article.source?.name &&
              article.publishedAt &&
              article.urlToImage
          )
        );
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchNews();
  }, [query, timePeriod, sortBy, sources]);

  // Handle search form submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    if (input && input.value.trim()) {
      setQuery(input.value.trim());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Latest Solar News. Easily Curatable.</h2>
        <Link href={"/"}>
          <button>
            <MdOutlineArrowBack /> Home
          </button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          name="search"
          className={styles.searchInput}
          placeholder="Search solar news..."
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <div className={styles.filterContainer}>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Newest</option>
        </select>
      </div>
      {error && <div className={styles.error}>Error: {error}</div>}
      {news.length > 0 ? (
        <ul className={styles.newsList}>
          {news.map((article, index) => (
            <li key={index} className={styles.newsItem}>
              {article.urlToImage && (
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  className={styles.newsImage}
                  width={150}
                  height={100}
                />
              )}
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.newsLink}
                  >
                    {article.title}
                  </a>
                </h3>
                <p className={styles.newsDescription}>
                  {truncate(article.description, 150)}
                </p>
                <p className={styles.newsMeta}>
                  <span className={styles.newsSource}>
                    {article.source.name}
                  </span>{" "}
                  |{" "}
                  <span className={styles.newsDate}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading solar news...</p>
      )}
    </div>
  );
};

export default NewsFetcher;
