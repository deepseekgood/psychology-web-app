import { Link } from 'react-router-dom'
import { counselors } from '../data'

export default function Counselors() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">心理咨询师</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counselors.map(c => (
          <Link
            key={c.id}
            to={`/counselors/${c.id}`}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-bold flex-shrink-0">
                {c.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{c.name}</span>
                  {c.isOnline && <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded">在线</span>}
                </div>
                <div className="text-sm text-gray-500 mb-2">{c.title}</div>
                <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{c.cases} 案例</span>
                    <span>⭐ {c.rating}</span>
                    <span>{c.experience} 年经验</span>
                  </div>
                  <span className="text-red-500 font-bold">¥{c.price}<span className="text-xs text-gray-400 font-normal">/次</span></span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
