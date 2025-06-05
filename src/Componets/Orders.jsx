import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../Redux/OrderSlice';

const Orders = () => {

    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    if (loading) return <p className='text-center'>Loading orders...</p>;
    if (error) return <p className='text-center text-red'>Error: {error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">#</th>
                                <th className="px-4 py-2 border">Order ID</th>
                                <th className="px-4 py-2 border">Customer Name</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.order_id} className="text-center">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{order.order_id}</td>
                                    <td className="px-4 py-2 border">{order.customer_name}</td>
                                    <td className="px-4 py-2 border capitalize">{order.status ? order.status : 'Pending'}</td>
                                    <td className="px-4 py-2 border">{order.status !== 'delivered' &&
                                        <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-colors duration-200">
                                            Cancel
                                        </button>
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}
export default Orders;
