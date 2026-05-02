import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { counselors } from '../data'

const consultTypes = [
  { name: '视频', value: 'video', icon: '📹' },
  { name: '语音', value: 'voice', icon: '🎤' },
  { name: '文字', value: 'text', icon: '💬' },
  { name: '面对面', value: 'offline', icon: '👥' },
]

const problemTypes = [
  { name: '情感问题', value: 'emotion' },
  { name: '学业压力', value: 'study' },
  { name: '焦虑抑郁', value: 'anxiety' },
  { name: '人际关系', value: 'relationship' },
  { name: '职业规划', value: 'career' },
  { name: '自我成长', value: 'growth' },
  { name: '家庭问题', value: 'family' },
  { name: '其他', value: 'other' },
]

const timeSlots = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: false },
  { time: '19:00', available: true },
  { time: '20:00', available: true },
]

export default function Appointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [counselor, setCounselor] = useState(null)
  const [selectedType, setSelectedType] = useState('video')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedProblems, setSelectedProblems] = useState([])
  const [problemDesc, setProblemDesc] = useState('')
  const [phone, setPhone] = useState('')
  const [wechat, setWechat] = useState('')
  const [dateList, setDateList] = useState([])

  useEffect(() => {
    const found = counselors.find(c => c.id === parseInt(id))
    if (found) {
      setCounselor(found)
    } else {
      navigate('/counselors')
    }

    // Generate date list
    const dates = []
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const month = date.getMonth() + 1
      const day = date.getDate()
      dates.push({
        date: `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
        week: i === 0 ? '今天' : weekDays[date.getDay()],
        day: day
      })
    }
    setDateList(dates)
    setSelectedDate(dates[0].date)
  }, [id, navigate])

  const toggleProblem = (value) => {
    if (selectedProblems.includes(value)) {
      setSelectedProblems(selectedProblems.filter(p => p !== value))
    } else {
      if (selectedProblems.length >= 3) {
        alert('最多选择3个问题类型')
        return
      }
      setSelectedProblems([...selectedProblems, value])
    }
  }

  const handleSubmit = () => {
    if (!selectedDate) { alert('请选择咨询日期'); return }
    if (!selectedTime) { alert('请选择咨询时间'); return }
    if (selectedProblems.length === 0) { alert('请选择咨询问题类型'); return }
    if (!phone || phone.length !== 11) { alert('请输入正确的手机号码'); return }

    const appointment = {
      id: 'ORD' + Date.now(),
      counselorId: counselor.id,
      counselorName: counselor.name,
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      problems: selectedProblems,
      problemDesc,
      phone,
      wechat,
      price: counselor.price,
      status: 'pending',
      createTime: Date.now()
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.unshift(appointment)
    localStorage.setItem('orders', JSON.stringify(orders))

    alert('预约成功！咨询师会在24小时内确认您的预约，请保持手机畅通。')
    navigate('/profile')
  }

  if (!counselor) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Counselor Info */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-xl font-bold">{counselor.name}</h1>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-sm opacity-80">咨询费用</span>
          <span className="text-3xl font-bold">¥{counselor.price}</span>
          <span className="text-sm opacity-80">/次</span>
        </div>
      </div>

      {/* Consult Type */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-4">咨询类型</h2>
        <div className="grid grid-cols-4 gap-3">
          {consultTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                selectedType === type.value
                  ? 'bg-purple-100 border-2 border-purple-500 text-purple-700'
                  : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mb-1">{type.icon}</span>
              <span className="text-sm">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-4">选择时间</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {dateList.map(date => (
            <button
              key={date.date}
              onClick={() => setSelectedDate(date.date)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl transition-all flex-shrink-0 ${
                selectedDate === date.date
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xs mb-1">{date.week}</span>
              <span className="text-lg font-bold">{date.day}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 mb-3">可选时段</div>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map(slot => (
            <button
              key={slot.time}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={`py-3 rounded-xl text-sm transition-all ${
                !slot.available
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : selectedTime === slot.time
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-700 font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Problems */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-4">咨询问题</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {problemTypes.map(problem => (
            <button
              key={problem.value}
              onClick={() => toggleProblem(problem.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedProblems.includes(problem.value)
                  ? 'bg-purple-100 border-2 border-purple-500 text-purple-700 font-medium'
                  : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              {problem.name}
            </button>
          ))}
        </div>
        <textarea
          value={problemDesc}
          onChange={(e) => setProblemDesc(e.target.value)}
          placeholder="请简要描述您的问题（选填）"
          maxLength={200}
          className="w-full h-32 bg-gray-50 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="text-right text-xs text-gray-400 mt-1">{problemDesc.length}/200</div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-4">联系方式</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">手机号码</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号码"
              maxLength={11}
              className="w-full h-12 bg-gray-50 rounded-xl px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">微信号（选填）</label>
            <input
              type="text"
              value={wechat}
              onChange={(e) => setWechat(e.target.value)}
              placeholder="请输入微信号"
              className="w-full h-12 bg-gray-50 rounded-xl px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-3">预约须知</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. 预约成功后，咨询师会在24小时内确认</p>
          <p>2. 如需取消预约，请提前24小时操作</p>
          <p>3. 咨询内容严格保密，请放心倾诉</p>
          <p>4. 首次咨询可享受15分钟免费体验</p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm">
        <div>
          <span className="text-sm text-gray-500">合计：</span>
          <span className="text-2xl font-bold text-red-500">¥{counselor.price}</span>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          提交预约
        </button>
      </div>
    </div>
  )
}
