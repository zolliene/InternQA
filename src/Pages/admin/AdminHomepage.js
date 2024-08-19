import Header from "../../component/header";
import QuestionsCard from "../../component/questionsCard";
import QuestionsTab from "../../component/questionsTabs";
import QuestionsTabAd from "../../component/admin/questionTabsAd";

function AdminHomepage() {
  return (
    <>
      <Header />
      <QuestionsTabAd />
      <QuestionsCard />
    </>
  );
}

export default AdminHomepage;
