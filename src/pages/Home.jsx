import { Link } from 'react-router-dom'
import { enneagramTypes, typeColors, counselors, articles } from '../data'

const banners = [
  { title: '探索你的九型人格', desc: '了解自己，发现内在潜能', bg: 'from-purple-500 to-purple-700' },
  { title: '专业心理咨询', desc: '遇见更好的自己', bg: 'from-red-400 to-red-600' },
  { title: '心理健康知识', desc: '每天学一点心理学', bg: 'from-teal-400 to-teal-600' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {banners.map((banner, i) => (
          <div key={i} className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-6 text-white`}>
            <h2 className="text-xl font-bold mb-2">{banner.title}</h2>
            <p className="text-sm opacity-90">{banner.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Entry */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Link to="/test" className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl mb-2">测</div>
          <span className="text-sm text-gray-700">九型人格测试</span>
        </Link>
        <Link to="/counselors" className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl mb-2">咨</div>
          <span className="text-sm text-gray-700">心理咨询</span>
        </Link>
        <Link to="/profile/records" className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mb-2">记</div>
          <span className="text-sm text-gray-700">测试记录</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mb-2">我</div>
          <span className="text-sm text-gray-700">个人中心</span>
        </Link>
      </div>

      {/* Enneagram Types */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">九型人格</h2>
          <Link to="/test" className="text-sm text-purple-600 hover:text-purple-700">了解更多 &gt;</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
          {Object.entries(enneagramTypes).map(([type, info]) => (
            <Link
              key={type}
              to="/test"
              className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2"
                style={{ backgroundColor: typeColors[type] }}
              >
                {type}
              </div>
              <span className="text-xs text-gray-700 text-center">{info.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">心理文章</h2>
        </div>
        <div className="space-y-3">
          {articles.map(article => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-800 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{article.desc}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">{article.tag}</span>
                <span>{article.time}</span>
                <span>{article.readCount}人阅读</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Counselors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">推荐咨询师</h2>
          <Link to="/counselors" className="text-sm text-purple-600 hover:text-purple-700">更多 &gt;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counselors.slice(0, 3).map(c => (
            <Link
              key={c.id}
              to={`/counselors/${c.id}`}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  {c.name[0]}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.title}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {c.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-500 font-bold">¥{c.price}<span className="text-xs text-gray-400 font-normal">/次</span></span>
                {c.isOnline && <span className="text-xs text-green-500">● 在线</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
