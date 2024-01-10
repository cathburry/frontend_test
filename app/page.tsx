"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import Gallery from "./gallery";

export default function Home() {
  const [users, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsersList(data);
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className={styles.main}>
      <Gallery users={users} isLoading={isLoading} />
    </main>
  );
}
