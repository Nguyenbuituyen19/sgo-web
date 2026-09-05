"use client";

import { useState } from "react";
import NewsHero from "./NewsHero";
import NewsFeatured from "./NewsFeatured";
import NewsGrid from "./NewsGrid";
import NewsCta from "./NewsCta";

export default function NewsMainContainer() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <NewsHero
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <NewsFeatured />
      <NewsGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
      />
      <NewsCta />
    </>
  );
}
