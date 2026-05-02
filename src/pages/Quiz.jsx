import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data'

const options = [
  { value: 1, label: '非常不符合' },
  { value: 2, label: '比较不符合' },
  { value: 3, label: '一般' },
  { value: 4, label: '比较符合' },
  { value: 5, label: '非常符合' },
]

export default function Quiz() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const currentQuestion = questions[currentIndex]
  const progress = Math.round((currentIndex / questions.length) * 100)

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentIndex]: value }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handleSubmit = () => {
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }

    questions.forEach((q, i) => {
      const answer = answers[i] || 0
      scores[q.type] += answer
    })

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
    const percentages = {}
    for (let type in scores) {
      percentages[type] = Math.round((scores[type] / totalScore) * 100)
    }

    const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const primaryType = parseInt(sortedTypes[0][0])
    const secondaryType = parseInt(sortedTypes[1][0])

    const result = {
      scores,
      percentages,
      primaryType,
      secondaryType,
      answers,
      timestamp: Date.now()
    }

    localStorage.setItem('testResult', JSON.stringify(result))

    const records = JSON.parse(localStorage.getItem('testRecords') || '[]')
    records.unshift(result)
    localStorage.setItem('testRecords', JSON.stringify(records))

    navigate('/test/result')
  }

  const isLast = currentIndex === questions.length - 1
  const answeredCount = Object.keys(answers).length

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">进度</span>
          <span className="text-sm text-gray-500">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="text-sm text-purple-600 mb-3">第 {currentIndex + 1} 题</div>
        <p className="text-lg text-gray-800 mb-8">{currentQuestion.content}</p>

        <div className="space-y-3">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                answers[currentIndex] === opt.value
                  ? 'bg-purple-100 border-2 border-purple-500 text-purple-700 font-medium'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          上一题
        </button>
        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium disabled:opacity-50 hover:bg-purple-700 transition-colors"
          >
            提交测试
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            下一题
          </button>
        )}
      </div>
    </div>
  )
}
