import { Link } from 'react-router-dom'
import { enneagramTypes, typeColors } from '../data'

export default function Test() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-8 text-white text-center mb-8">
        <h1 className="text-2xl font-bold mb-3">九型人格测试</h1>
        <p className="text-sm opacity-90 mb-6">通过108道题目，深入了解你的人格类型</p>
        <Link
          to="/test/quiz"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
        >
          开始测试
        </Link>
      </div>

      {/* Types Overview */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">九种人格类型</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(enneagramTypes).map(([type, info]) => (
          <div key={type} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: typeColors[type] }}
              >
                {type}
              </div>
              <div>
                <div className="font-bold text-gray-800">{info.name}</div>
                <div className="text-xs text-gray-500">{info.alias}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{info.description}</p>
            <div className="flex flex-wrap gap-1">
              {info.key_characteristics.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
