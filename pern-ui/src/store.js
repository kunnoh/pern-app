import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer';
import messageReducer from './reducers/message.reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer
    }
})

export default store;