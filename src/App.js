import Home from "./Componets/Home";
import Orders from "./Componets/Orders";
import { updateStatus, addOrder } from "./Redux/OrderSlice";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_BASE_URL}/notifications/`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);

      if (data.action === 'new') {
        dispatch(addOrder({
          order_id: data.order_id,
          product_name: data.product_name,
          customer_name: data.customer_name,
          price: data.price,
          status: data.status,
        }));
      } else if (data.action === 'update') {
        // Order update received
        dispatch(updateStatus({
          order_id: data.order_id,
          status: data.status,
        }));
      }
    };


    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);
  return (
    <>
      <div>
        <Home />
        <Orders />
      </div>
    </>
  );
}

export default App;
