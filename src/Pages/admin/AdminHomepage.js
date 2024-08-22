import Header from "../../component/header";
import QuestionsCard from "../../component/questionsCard";
import QuestionsTab from "../../component/questionsTabs";
import QuestionsTabAd from "../../component/admin/questionTabsAd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminHomepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    if (userRole !== "Admin") {
      navigate("/home-page"); // Redirect intern to their homepage
    }
  }, [navigate]);
  return (
    <>
      <Header />
      <QuestionsTabAd />
      <QuestionsCard />
    </>
  );
}

export default AdminHomepage;
