import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga/rootSaga';
import userSlice from './reducer/userSlice';
import cardSlice from './reducer/cardSlice';
import workingSpaceSlice from './reducer/workingSpaceSlice';
import boardSlice from './reducer/boardSlice';
import laneSlice from './reducer/laneSlice';
import listTaskSlice from './reducer/listTaskSlice';
import taskSlice from './reducer/taskSlice';
import dateTimeSlice from './reducer/dateTimeSlice';
import backgroundSlice from './reducer/backgroundSlice';
import memberSlice from './reducer/memberSlice';
import memberCardSlice from './reducer/memberCardSlice';
import cardTagSlice from './reducer/cardTagSlice';
import memberWsSlice from './reducer/memberWsSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    user: userSlice,
    card: cardSlice,
    lanes: laneSlice,
    workingSpace: workingSpaceSlice,
    board: boardSlice,
    listTask: listTaskSlice,
    task: taskSlice,
    dateTime: dateTimeSlice,
    backgrounds: backgroundSlice,
    members: memberSlice,
    memberCards: memberCardSlice,
    cardTags: cardTagSlice,
    memberWs: memberWsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export default store;
