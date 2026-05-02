import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { counselors } from '../data'

const typeLabels = {
  video: '视频咨询',
  voice: '语音咨询',
  text: '文字咨询',
  offline: '面对面咨询',
}

const statusLabels = {
  pending: '待确认',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消',
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-gray-100 text-gray-700',
}

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('orders')
    if (stored) {
      setOrders(JSON.parse(stored))
    }
  }, [])

  const handleCancel = (index) => {
    if (confirm('确定要取消这个预约吗？')) {
      const newOrders = [...orders]
      newOrders[index].status = 'cancelled'
      setOrders(newOrders)
      localStorage.setItem('orders', JSON.stringify(newOrders))
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">预约记录</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-gray-500 mb-4">暂无预约记录</p>
          <Link
            to="/counselors"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            去预约
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => {
            const counselor = counselors.find(c => c.id === order.counselorId)

            return (
              <div key={order.id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      {order.counselorName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{order.counselorName}</div>
                      <div className="text-xs text-gray-500">订单号：{order.id}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div>咨询类型：{typeLabels[order.type]}</div>
                  <div>预约日期：{order.date}</div>
                  <div>预约时间：{order.time}</div>
                  <div>咨询费用：¥{order.price}</div>
                </div>

                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(index)}
                    className="w-full py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    取消预约
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
