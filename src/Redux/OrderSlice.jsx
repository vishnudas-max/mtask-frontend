import { createSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../confg';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {

  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching orders');
  }
})


const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateStatus: (state, action) => {
      const currentOrder = state.orders.find(order => order.order_id === action.payload.order_id);
      if (currentOrder) {
        currentOrder.status = action.payload.status;
      }
    },
    addOrder:(state,action)=>{
      state.orders.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  },
});

export const { updateStatus ,addOrder} = orderSlice.actions;
export default orderSlice.reducer;