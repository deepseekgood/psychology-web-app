import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { articles } from '../data'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const found = articles.find(a => a.id === parseInt(id))
    if (found) {
      setArticle(found)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  if (!article) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded">{article.tag}</span>
          <span>{article.time}</span>
          <span>{article.readCount}人阅读</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="bg-white rounded-xl p-6 shadow-sm mb-6 prose prose-purple max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Actions */}
      <div className="flex items-center justify-around bg-white rounded-xl p-4 shadow-sm">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex flex-col items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
        >
          <span className="text-2xl">♥</span>
          <span className="text-xs">{isLiked ? '已点赞' : '点赞'}</span>
        </button>
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`flex flex-col items-center gap-1 ${isFavorited ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          <span className="text-2xl">★</span>
          <span className="text-xs">{isFavorited ? '已收藏' : '收藏'}</span>
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: article.title,
                text: article.desc,
                url: window.location.href
              })
            } else {
              navigator.clipboard.writeText(window.location.href)
              alert('链接已复制到剪贴板')
            }
          }}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <span className="text-2xl">↗</span>
          <span className="text-xs">分享</span>
        </button>
      </div>
    </div>
  )
}
