import React from "react";
import Header from "../component/header";
import QuestionsTab from "../component/questionsTabs";
import QuestionsCard from "../component/questionsCard";
import QuestionsAccordion from "../component/questionsManage";
import QuestionsTabAd from "../component/questionTabsAd";

export default function HomePage() {
  return (
    <div>
      <Header />
      <QuestionsTabAd />
    </div>
  );
}
