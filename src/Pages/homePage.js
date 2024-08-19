import React from 'react'
import Header from '../component/header'
import QuestionsTab from '../component/questionsTabs'
import QuestionsCard from '../component/questionsCard'
import QuestionsAccordion from '../component/questionsManage'

export default function HomePage() {
  return (
    <div>
        <Header/>
        <QuestionsTab/>
        <QuestionsCard/>
    </div>
  )
}
