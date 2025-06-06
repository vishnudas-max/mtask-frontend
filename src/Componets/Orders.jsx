import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../Redux/OrderSlice';
import MessageModal from './MessageModal';
import api from '../confg';
const Orders = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalType, setModalType] = useState("success")


    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    if (loading) return <p className='text-center'>Loading orders...</p>;
    if (error) return <p className='text-center text-red'>Error: {error}</p>;

    // const sendCancelMail = async (order_id) => {
    //     try {
    //         const response = await api.post(`/update/order/${order_id}/`);

    //         if (response.data && response.data.message) {
    //             setModalMsg(response.data.message);
    //             setModalType("error");
    //             setShowModal(true);
    //             console.log(response.data)
    //             return
    //         } else {
    //             setModalMsg("Email to cancell order send successfully");
    //             setModalType("error");
    //             setShowModal(true);
    //             console.log(response.data)
    //             return
    //         }
    //     } catch (error) {
    //         const errorMsg = error.response?.data?.message || "Something went wrong while cancelling the order.";
    //         setModalMsg(errorMsg);
    //         setModalType("error");
    //         setShowModal(true);
    //         return
    //     }
    // };

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
                                <th className="px-4 py-2 border">Product Name</th>
                                <th className="px-4 py-2 border">Customer Name</th>
                                <th className="px-4 py-2 border">Status</th>
                                {/* <th className="px-4 py-2 border">action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.order_id} className="text-center">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{order.order_id}</td>
                                    <td className="px-4 py-2 border">{order.product_name}</td>
                                    <td className="px-4 py-2 border">{order.customer_name}</td>
                                    <td className="px-4 py-2 border capitalize">{order.status ? order.status : 'Pending'}</td>
                                    {/* <td className="px-4 py-2 border">{order.status !== 'delivered' && order.status !== 'cancelled' &&
                                        <button onClick={() => sendCancelMail(order.order_id)} className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-colors duration-200">
                                            Cancel
                                        </button>
                                    }
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <MessageModal
                    message={modalMsg}
                    type={modalType}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>

    );
}
export default Orders;
