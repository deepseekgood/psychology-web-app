import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enneagramTypes, typeColors } from '../data'

export default function Result() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [primaryTypeInfo, setPrimaryTypeInfo] = useState(null)
  const [secondaryTypeInfo, setSecondaryTypeInfo] = useState(null)
  const [scoreList, setScoreList] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('testResult')
    if (!stored) {
      navigate('/test')
      return
    }

    const data = JSON.parse(stored)
    setResult(data)
    setPrimaryTypeInfo(enneagramTypes[data.primaryType])
    setSecondaryTypeInfo(enneagramTypes[data.secondaryType])

    const list = Object.entries(data.percentages).map(([type, percent]) => ({
      type: parseInt(type),
      name: enneagramTypes[type].name,
      percent,
      color: typeColors[type]
    }))
    list.sort((a, b) => b.percent - a.percent)
    setScoreList(list)
  }, [navigate])

  if (!result || !primaryTypeInfo) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-8 text-white text-center mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4"
          style={{ backgroundColor: typeColors[result.primaryType] }}
        >
          {result.primaryType}
        </div>
        <h1 className="text-2xl font-bold mb-1">{primaryTypeInfo.name}</h1>
        <p className="text-sm opacity-80">{primaryTypeInfo.alias}</p>
      </div>

      {/* Key Characteristics */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">核心特征</h2>
        <div className="flex flex-wrap gap-2">
          {primaryTypeInfo.key_characteristics.map(tag => (
            <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">人格描述</h2>
        <p className="text-gray-600">{primaryTypeInfo.description}</p>
      </div>

      {/* Motivation & Fear */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">核心动机与恐惧</h2>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">核心动机</div>
            <p className="text-gray-700">{primaryTypeInfo.core_motivation}</p>
          </div>
          <div className="border-t pt-4">
            <div className="text-sm text-gray-500 mb-1">核心恐惧</div>
            <p className="text-gray-700">{primaryTypeInfo.core_fear}</p>
          </div>
        </div>
      </div>

      {/* Score Chart */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-4">各类型得分占比</h2>
        <div className="space-y-3">
          {scoreList.map(item => (
            <div key={item.type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{item.type}. {item.name}</span>
                <span className="text-sm font-medium text-gray-800">{item.percent}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wing Analysis */}
      {result.secondaryType && (
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <h2 className="font-bold text-gray-800 mb-3">翼型分析</h2>
          <p className="text-gray-600 mb-4">
            你的翼型是 {result.secondaryType} 号（{secondaryTypeInfo.name}），这意味着你除了具有 {result.primaryType} 号的核心特征外，还带有 {result.secondaryType} 号的一些特质。
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">翼型特征</div>
            <p className="text-gray-700">{secondaryTypeInfo.description}</p>
          </div>
        </div>
      )}

      {/* Growth Advice */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-3">成长建议</h2>
        <div className="space-y-3">
          {primaryTypeInfo.growth_advice.map((advice, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-gray-700">{advice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/test"
          className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium text-center hover:bg-gray-300 transition-colors"
        >
          重新测试
        </Link>
        <Link
          to="/counselors"
          className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium text-center hover:bg-purple-700 transition-colors"
        >
          咨询专家
        </Link>
      </div>
    </div>
  )
}
