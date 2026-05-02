import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enneagramTypes, typeColors } from '../data'

export default function Profile() {
  const [testResult, setTestResult] = useState(null)
  const [typeName, setTypeName] = useState('')
  const [typeColor, setTypeColor] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('testResult')
    if (stored) {
      const result = JSON.parse(stored)
      setTestResult(result)
      setTypeName(enneagramTypes[result.primaryType].name)
      setTypeColor(typeColors[result.primaryType])
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* User Info */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold">用户</h1>
            {testResult && (
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: typeColor + '33' }}
                >
                  {testResult.primaryType}号 · {typeName}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Result Card */}
      {testResult && (
        <Link
          to="/test/result"
          className="block bg-white rounded-xl p-5 shadow-sm mb-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-800 mb-1">我的人格类型</h2>
              <p className="text-sm text-gray-500">点击查看详细结果</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: typeColor }}
              >
                {testResult.primaryType}
              </div>
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>
        </Link>
      )}

      {/* Menu Items */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <Link to="/profile/records" className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <span className="text-gray-700">测试记录</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </Link>
        <Link to="/profile/orders" className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">📋</span>
            <span className="text-gray-700">预约记录</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </Link>
        <button className="flex items-center justify-between p-4 border-b w-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">⭐</span>
            <span className="text-gray-700">我的收藏</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </button>
        <button className="flex items-center justify-between p-4 border-b w-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">📖</span>
            <span className="text-gray-700">浏览历史</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <button className="flex items-center justify-between p-4 border-b w-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">ℹ️</span>
            <span className="text-gray-700">关于我们</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </button>
        <button className="flex items-center justify-between p-4 border-b w-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <span className="text-gray-700">意见反馈</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </button>
        <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <span className="text-gray-700">设置</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </button>
      </div>
    </div>
  )
}
