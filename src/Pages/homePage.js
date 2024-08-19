import React from 'react'
import Header from '../component/header'
import QuestionsTab from '../component/questionsTabs'
import QuestionsCard from '../component/questionsCard'

export default function HomePage() {
  return (
    <div>
        <Header/>
        <QuestionsTab/>
        <QuestionsCard/>
    </div>
  )
}
