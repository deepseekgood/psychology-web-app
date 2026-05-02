import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { counselors, typeColors } from '../data'

const reviews = [
  { id: 1, name: '匿名用户', rating: 5, time: '2024-01-15', content: '老师非常专业，帮助我理清了困惑已久的问题，现在感觉轻松了很多。' },
  { id: 2, name: '匿名用户', rating: 5, time: '2024-01-10', content: '咨询过程中老师很有耐心，给了我很多实用的建议，感谢！' },
  { id: 3, name: '匿名用户', rating: 4, time: '2024-01-05', content: '整体体验不错，老师很专业，会继续咨询。' },
]

export default function CounselorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [counselor, setCounselor] = useState(null)

  useEffect(() => {
    const found = counselors.find(c => c.id === parseInt(id))
    if (found) {
      setCounselor(found)
    } else {
      navigate('/counselors')
    }
  }, [id, navigate])

  if (!counselor) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
            {counselor.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{counselor.name}</h1>
            <p className="text-sm opacity-80">{counselor.title}</p>
            {counselor.isOnline && (
              <span className="inline-block mt-2 text-xs bg-green-400/30 px-2 py-1 rounded">● 在线</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <span>{counselor.cases} 案例</span>
          <span>⭐ {counselor.rating}</span>
          <span>{counselor.experience} 年经验</span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">咨询费用</div>
            <div className="text-3xl font-bold text-red-500">¥{counselor.price}<span className="text-sm text-gray-400 font-normal">/次（50分钟）</span></div>
          </div>
          <Link
            to={`/appointment/${counselor.id}`}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            立即预约
          </Link>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">专业领域</h2>
        <div className="flex flex-wrap gap-2">
          {counselor.tags.map(tag => (
            <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">个人简介</h2>
        <p className="text-gray-600">{counselor.bio}</p>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">用户评价</h2>
          <span className="text-sm text-gray-500">({reviews.length}条)</span>
        </div>
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                    {review.name[0]}
                  </div>
                  <span className="text-sm text-gray-700">{review.name}</span>
                </div>
                <span className="text-xs text-gray-400">{review.time}</span>
              </div>
              <div className="text-yellow-400 mb-2">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-gray-600">{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-4">
        <button className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors">
          在线咨询
        </button>
        <Link
          to={`/appointment/${counselor.id}`}
          className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium text-center hover:bg-purple-700 transition-colors"
        >
          预约咨询
        </Link>
      </div>
    </div>
  )
}
