"use client";

import React, { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";
import styles from "./Chat.module.css";
import { FaPaperPlane, FaUserCircle, FaRobot } from "react-icons/fa"; // Import React Icons

interface ChatHistoryEntry {
  role: "user" | "bot";
  message: string;
}

export default function Chat() {
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatHistoryEntry[]>([]);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [history]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", message: userMessage },
    ]);
    setMessage("");

    try {
      const chatCompletion = await getGroqChatCompletion(userMessage);
      const botResponse =
        chatCompletion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "bot", message: botResponse },
      ]);
    } catch (error) {
      console.error("Error fetching Groq Chat Completion:", error);
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "bot",
          message: "Failed to get response. Please try again later.",
        },
      ]);
    }
  }

  async function getGroqChatCompletion(userMessage: string) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful bot that can answer questions about Solar Energy, solar panels, ROI, panels efficiency, etc... and alway answer in 2, 3 or 4 lines max. Don't give markdown formatted responses.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Ask me anything!</h1>
      <div className={styles.chatContainer}>
        <div className={styles.history} ref={chatHistoryRef}>
          {history.map((entry, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                entry.role === "user" ? styles.userMessage : styles.botMessage
              }`}
            >
              <div className={styles.messageHeader}>
                {entry.role === "user" ? (
                  <span className={styles.userIcon}>
                    <FaUserCircle className={styles.icon} aria-hidden="true" />
                    You
                  </span>
                ) : (
                  <span className={styles.botIcon}>
                    <FaRobot className={styles.icon} aria-hidden="true" />
                    Bot
                  </span>
                )}
              </div>
              <p className={styles.messageText}>{entry.message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className={styles.button}
            aria-label="Send message"
          >
            <FaPaperPlane className={styles.sendIcon} aria-hidden="true" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
