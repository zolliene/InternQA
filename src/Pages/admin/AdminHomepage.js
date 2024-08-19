import Header from "../../component/header";
import QuestionsCard from "../../component/questionsCard";
import QuestionsTab from "../../component/questionsTabs";

function AdminHomepage() {
  return (
    <>
      <Header />
      <QuestionsTab />
      <QuestionsCard />
    </>
  );
}

export default AdminHomepage;
