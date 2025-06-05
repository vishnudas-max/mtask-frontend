import React, { useState } from 'react';
import api from '../confg'
import MessageModal from './MessageModal';

const Home = () => {

    // states to manage error modals
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalType, setModalType] = useState("success")

    const [form, setForm] = useState({
        order_id: '',
        customer_name: '',
        product_name: '',
        price: '',
    });

    const [error, setError] = useState({
        orderid: '',
        customername: '',
        product_name: '',
        price: '',
    });

    const validateAlphanumeric = (value) => /^[a-z0-9]+$/i.test(value);
    const validatePrice = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

    const handleOrderID = (e) => {
        const value = e.target.value;
        setForm({ ...form, order_id: value });

        if (!validateAlphanumeric(value)) {
            setError((prev) => ({ ...prev, orderid: 'Order ID must be alphanumeric' }));
        }
        else {
            setError((prev) => ({ ...prev, orderid: '' }));
        }
    };

    const handleCustomerName = (e) => {
        const value = e.target.value;
        setForm({ ...form, customer_name: value });

        if (!validateAlphanumeric(value)) {
            setError((prev) => ({ ...prev, customername: 'Customer name must be alphanumeric' }));
        } else {
            setError((prev) => ({ ...prev, customername: '' }));
        }
    };

    const handleProductName = (e) => {
        const value = e.target.value;
        setForm({ ...form, product_name: value });

        if (!validateAlphanumeric(value)) {
            setError((prev) => ({ ...prev, product_name: 'Product name must be alphanumeric' }));
        } else {
            setError((prev) => ({ ...prev, product_name: '' }));
        }
    };

    const handlePrice = (e) => {
        const value = e.target.value;
        setForm({ ...form, price: value });

        if (!validatePrice(value)) {
            setError((prev) => ({ ...prev, price: 'Price must be a valid number' }));
        } else {
            setError((prev) => ({ ...prev, price: '' }));
        }
    };


    const submitdata = () => {
        // Check for validation errors
        const hasErrors = Object.values(error).some((err) => err !== '');
        if (hasErrors) {

            setModalMsg('Please fix validation errors before submitting.');
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Check for empty fields (consider only string fields for trim)
        const hasEmptyFields = Object.entries(form).some(([key, val]) => {
            // Check if val is string and empty after trim OR val is null/undefined
            if (typeof val === 'string') {
                return val.trim() === '';
            }
            return val === null || val === undefined || val === '';
        });

        if (hasEmptyFields) {

            setModalMsg('Please fill in all fields before submitting.');
            setModalType("error");
            setShowModal(true);
            return;
        }

        api.post('orders/', form)
            .then(result => {
                console.log(result);
                setModalMsg("Order created successfully!");
                setModalType("success");
                setShowModal(true);
                setForm({
                    order_id: '',
                    customer_name: '',
                    product_name: '',
                    price: '',
                })

            })
            .catch(error => {
                if (error.response && error.response.data) {
                    const errors = error.response.data;

                    // Combine all field errors into a single message
                    const errorMessages = Object.entries(errors)
                        .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
                        .join('\n');
                    console.log(errorMessages)
                    setModalMsg(errorMessages);
                    setModalType("error");
                    setShowModal(true);
                } else {
                    console.log('something went wrong.please try again.')
                    setModalMsg("Something went wrong. Please try again.");
                    setModalType("error");
                    setShowModal(true);
                }
            });

    };



    return (
        <div className='w-full flex-col gap-10 justify-items-center pt-3 '>
            <h1 className='font-bold text-nowrap  text-[30px] text-center'>Add Order here</h1>
            <div className='flex-col h-fit gap-4'>
                <div>
                    <div className='flex text-nowrap gap-x-2 mt-3 bg-gray-400 rounded-md p-3 md:w-[600px] w-[400px]'>
                        <label htmlFor="orderid" className='basis-1/5'>Order ID:</label>
                        <input
                            onChange={e => handleOrderID(e)}
                            value={form.order_id} className='bg-transparent w-full basis-4/5 outline-none border-b-[1px] border-black ' type="text" placeholder='Enter Order ID' name='orderid' />
                    </div>
                    {error.orderid && <p className='text-[13px] text-red-600'>{error.orderid}</p>}
                </div>
                <div>
                    <div className='flex text-nowrap gap-x-2 mt-3 bg-gray-400 rounded-md p-3 md:w-[600px] w-[400px]'>
                        <label htmlFor="customername" className='basis-1/5'>Customer Name:</label>
                        <input
                            onChange={e => handleCustomerName(e)}
                            value={form.customer_name} className='bg-transparent basis-4/5  w-full outline-none border-b-[1px] border-black ' type="text" placeholder='Enter Customer Name' name='orderid' />
                    </div>
                    {error.customername && <p className='text-[13px] text-red-600'>{error.customername}</p>}
                </div>
                <div>
                    <div className='flex text-nowrap mt-3 gap-x-2 bg-gray-400 rounded-md p-3 md:w-[600px] w-[400px]'>
                        <label htmlFor="productname" className='basis-1/5'>Product Name:</label>
                        <input
                            onChange={e => handleProductName(e)}
                            value={form.product_name} className='bg-transparent basis-4/5  w-full outline-none border-b-[1px] border-black ' type="text" placeholder='Enter Product Name' name='orderid' />
                    </div>
                    {error.product_name && <p className='text-[13px] text-red-600'>{error.product_name}</p>}

                </div>
                <div>
                    <div className='flex text-nowrap mt-3 gap-x-2 bg-gray-400 rounded-md p-3 md:w-[600px] w-[400px]'>
                        <label htmlFor="orderid" className='basis-1/5'>Price:</label>
                        <input
                            onChange={e => handlePrice(e)}
                            value={form.price} className='no-spinner bg-transparent basis-4/5  w-full outline-none border-b-[1px] border-black ' type="number" placeholder='Enter Price' name='orderid' />
                    </div>
                    {error.price && <p className='text-[13px] text-red-600'>{error.price}</p>}

                </div>
                <button className='bg-blue-500 rounded-md px-3 py-2 mt-5' onClick={submitdata}>Save Order</button>
            </div>
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

export default Home;
