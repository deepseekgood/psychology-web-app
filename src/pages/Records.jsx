import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enneagramTypes, typeColors } from '../data'

export default function Records() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('testRecords')
    if (stored) {
      setRecords(JSON.parse(stored))
    }
  }, [])

  const handleViewResult = (result) => {
    localStorage.setItem('testResult', JSON.stringify(result))
    navigate('/test/result')
  }

  const handleDelete = (index) => {
    if (confirm('确定要删除这条记录吗？')) {
      const newRecords = records.filter((_, i) => i !== index)
      setRecords(newRecords)
      localStorage.setItem('testRecords', JSON.stringify(newRecords))
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">测试记录</h1>

      {records.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-500 mb-4">暂无测试记录</p>
          <Link
            to="/test"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            去测试
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((result, index) => {
            const typeInfo = enneagramTypes[result.primaryType]
            const color = typeColors[result.primaryType]
            const date = new Date(result.timestamp)
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

            return (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: color }}
                    >
                      {result.primaryType}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{typeInfo.name}</div>
                      <div className="text-xs text-gray-500">{dateStr}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    删除
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewResult(result)}
                    className="flex-1 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    查看结果
                  </button>
                  <Link
                    to="/test/quiz"
                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium text-center hover:bg-gray-200 transition-colors"
                  >
                    重新测试
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
