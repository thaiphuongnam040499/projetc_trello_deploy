import { all, takeLatest } from 'redux-saga/effects';
import * as userSaga from './userSaga';
import * as userSlice from '../redux/reducer/userSlice';
import * as cardSlice from '../redux/reducer/cardSlice';
import * as cardSaga from './cardSaga';
import * as laneSlice from '../redux/reducer/laneSlice';
import * as laneSaga from './laneSaga';
import * as workingSpaceSlice from '../redux/reducer/workingSpaceSlice';
import * as workingSpaceSaga from './workingSpaceSaga';
import * as boardSlice from '../redux/reducer/boardSlice';
import * as boardSaga from './boardSaga';
import * as listTaskSlice from '../redux/reducer/listTaskSlice';
import * as listTaskSaga from './listTaskSaga';
import * as taskSlice from '../redux/reducer/taskSlice';
import * as taskSaga from './taskSaga';
import * as dateTimeSlice from '../redux/reducer/dateTimeSlice';
import * as dateTimeSaga from './dateTimeSaga';
import * as backgroundSlice from '../redux/reducer/backgroundSlice';
import * as backgroundSaga from './backgroundSaga';
import * as memberSlice from '../redux/reducer/memberSlice';
import * as memberSaga from './memberSaga';
import * as memberCardSlice from '../redux/reducer/memberCardSlice';
import * as memberCardSaga from './memberCardSaga';
import * as cardTagSlice from '../redux/reducer/cardTagSlice';
import * as cardTagSaga from './cardTagSaga';
import * as memberWsSlice from '../redux/reducer/memberWsSlice';
import * as memberWsSaga from './memberWsSaga';

export const rootSaga = function* () {
  yield all([
    // user
    takeLatest(userSlice.createUser.type, userSaga.USER_SAGA_POST),
    takeLatest(userSlice.register.type, userSaga.USER_SAGA_REGISTER),
    takeLatest(userSlice.findAllUser.type, userSaga.USER_SAGA_GET),
    takeLatest(userSlice.login.type, userSaga.USER_SAGA_LOGIN),
    takeLatest(userSlice.findUserByEmail.type, userSaga.USER_SAGA_GET_BY_EMAIL),

    // card
    takeLatest(cardSlice.create.type, cardSaga.CARD_SAGA_POST),
    takeLatest(cardSlice.updateCard.type, cardSaga.CARD_SAGA_PUT),
    takeLatest(cardSlice.deleteCard.type, cardSaga.CARD_SAGA_DELETE),
    takeLatest(cardSlice.updateCard.type, cardSaga.CARD_SAGA_PATCH),
    takeLatest(cardSlice.findAllCard.type, cardSaga.CARD_SAGA_GET),
    takeLatest(cardSlice.findCardByTitle.type, cardSaga.CARD_SAGA_SEARCH),

    // Lane
    takeLatest(laneSlice.createLane.type, laneSaga.LIST_SAGA_POST),
    takeLatest(laneSlice.findAllLane.type, laneSaga.LIST_SAGA_GET),
    takeLatest(laneSlice.updateLane.type, laneSaga.LIST_SAGA_PUT),
    takeLatest(laneSlice.updateLane.type, laneSaga.LANE_SAGA_PATCH),
    takeLatest(laneSlice.deleteLane.type, laneSaga.LANE_SAGA_DELETE),

    // working space
    takeLatest(
      workingSpaceSlice.createWorkingSpace.type,
      workingSpaceSaga.WORKINGSPACE_SAGA_POST
    ),
    takeLatest(
      workingSpaceSlice.findAllWorkingSpace.type,
      workingSpaceSaga.WORKINGSPACE_SAGA_GET
    ),
    takeLatest(
      workingSpaceSlice.findWsByUserId.type,
      workingSpaceSaga.findProjectsByUserId
    ),
    takeLatest(
      workingSpaceSlice.deleteWs.type,
      workingSpaceSaga.WORKINGSPACE_SAGA_DELETE
    ),

    // board
    takeLatest(boardSlice.createBoard.type, boardSaga.BOARD_SAGA_POST),
    takeLatest(boardSlice.findAllBoard.type, boardSaga.BOARD_SAGA_GET),
    takeLatest(boardSlice.deleteBoard.type, boardSaga.BOARD_SAGA_DELETE),

    // listTask
    takeLatest(
      listTaskSlice.findAllListTask.type,
      listTaskSaga.LISTTASK_SAGA_GET
    ),
    takeLatest(
      listTaskSlice.createListTask.type,
      listTaskSaga.LISTTASK_SAGA_POST
    ),
    takeLatest(
      listTaskSlice.updateListTask.type,
      listTaskSaga.LISTTASK_SAGA_PATCH
    ),
    takeLatest(
      listTaskSlice.deleteListTask.type,
      listTaskSaga.LISTTASK_SAGA_DELETE
    ),

    // task
    takeLatest(taskSlice.findAllTask.type, taskSaga.TASK_SAGA_GET),
    takeLatest(taskSlice.createTask.type, taskSaga.TASK_SAGA_POST),
    takeLatest(taskSlice.updateTask.type, taskSaga.TASK_SAGA_PATCH),
    takeLatest(taskSlice.deleteTask.type, taskSaga.TASK_SAGA_DELETE),

    // dateTime
    takeLatest(
      dateTimeSlice.findAllDateTime.type,
      dateTimeSaga.DATETIME_SAGA_GET
    ),
    takeLatest(
      dateTimeSlice.createDateTime.type,
      dateTimeSaga.DATETIME_SAGA_POST
    ),
    takeLatest(
      dateTimeSlice.updateDateTime.type,
      dateTimeSaga.DATETIME_SAGA_PATCH
    ),
    takeLatest(
      dateTimeSlice.deleteDateTime.type,
      dateTimeSaga.DATETIME_SAGA_DELETE
    ),

    // background
    takeLatest(
      backgroundSlice.findAllBackground.type,
      backgroundSaga.BG_SAGA_GET
    ),
    takeLatest(
      backgroundSlice.findAllBgColor.type,
      backgroundSaga.BGC_SAGA_GET
    ),
    takeLatest(
      backgroundSlice.updateBgColor.type,
      backgroundSaga.BGC_SAGA_PATCH
    ),

    // member
    takeLatest(memberSlice.findAllMember.type, memberSaga.MEMBER_SAGA_GET),
    takeLatest(memberSlice.createMember.type, memberSaga.MEMBER_SAGA_POST),
    takeLatest(memberSlice.updateMember.type, memberSaga.MEMBER_SAGA_PATCH),
    takeLatest(memberSlice.deleteMember, memberSaga.MEMBER_SAGA_DELETE),

    //memberCard
    takeLatest(
      memberCardSlice.findAllMemberCard.type,
      memberCardSaga.MEMBERCARD_SAGA_GET
    ),
    takeLatest(
      memberCardSlice.createMemberCard.type,
      memberCardSaga.MEMBERCARD_SAGA_POST
    ),
    takeLatest(
      memberCardSlice.deleteMemberCard.type,
      memberCardSaga.MEMBERCARD_SAGA_DELETE
    ),

    // cardTags
    takeLatest(cardTagSlice.findAllCardTag.type, cardTagSaga.CARDTAGS_SAGA_GET),
    takeLatest(cardTagSlice.createCardTag.type, cardTagSaga.CARDTAGS_SAGA_POST),
    takeLatest(
      cardTagSlice.deleteCardTag.type,
      cardTagSaga.CARDTAGS_SAGA_DELETE
    ),
    takeLatest(
      cardTagSlice.updateCardTag.type,
      cardTagSaga.CARDTAGS_SAGA_PATCH
    ),

    // memberWs
    takeLatest(
      memberWsSlice.findAllMemberWs.type,
      memberWsSaga.MEMBERWS_SAGA_GET
    ),
    takeLatest(
      memberWsSlice.createMemberWs.type,
      memberWsSaga.MEMBERWS_SAGA_POST
    ),
    takeLatest(
      memberWsSlice.deleteMemberWs.type,
      memberWsSaga.MEMBERWS_SAGA_DELETE
    ),
  ]);
};
