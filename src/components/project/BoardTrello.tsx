import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Board from 'react-trello-ts';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import * as laneSlice from '../../redux/reducer/laneSlice';
import * as cardSlice from '../../redux/reducer/cardSlice';
import HeaderProject from './HeaderProject';
import { CardType } from '../../types/card.type';
import { BoardData, Card, Lane } from '../../types/lanes.type';
import ModalCard from './ModalCard';
import '../../assets/react-trello.css';
import CreateCard from './FormCreateCard';
import CreateLane from './FormCreateLane';
import { findAllBackground } from '../../redux/reducer/backgroundSlice';
import TableProject from './TableProject';
import { toast } from 'react-hot-toast';

const initialState: BoardData = {
  lanes: [],
};

export default function BoardTrello() {
  const [data, setData] = useState<BoardData>(initialState);
  const [currentCard, setCurrentCard] = useState<Card['id'] | null>(null);
  const lanes = useSelector((state: RootState) => state.lanes.lanes);
  const cards = useSelector((state: RootState) => state.card.listCard);
  const [typeView, setTypeView] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { boardId } = useParams();

  useEffect(() => {
    dispatch(cardSlice.findAllCard());
    dispatch(laneSlice.findAllLane());
    dispatch(findAllBackground());
  }, [boardId]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < lanes.length; i++) {
      if (location.state.board.id === lanes[i].boardId) {
        let laneData: any = {
          id: lanes[i].id,
          title: lanes[i].title,
          cards: [],
          boardId: lanes[i].boardId,
          order: lanes[i].order,
        };

        for (let j = 0; j < cards.length; j++) {
          if (lanes[i].id === cards[j].laneId) {
            let cardData: any = {
              id: cards[j].id,
              title: cards[j].title,
              draggable: true,
              laneId: cards[j].laneId,
              order: cards[j].order,
            };
            laneData.cards.push(cardData);
          }
        }
        laneData.cards.sort((a: any, b: any) => a.order - b.order);
        arr.push(laneData);
        arr.sort((a: any, b: any) => a.order - b.order);
      }
      setData({
        lanes: arr,
      });
    }
  }, [lanes, cards]);

  const handleDragStart = (cardId: any, laneId: any) => {};

  const handleDragEnd = (
    cardId: any,
    sourceLaneId: any,
    targetLaneId: any,
    index: any
  ) => {};

  const handleAddCard = (cards: CardType) => {
    let cardArr = getCardsByLaneId(cards.laneId);
    let card = {
      id: cards.id,
      title: cards.title,
      order: cardArr.length,
      laneId: cards.laneId,
      description: '',
    };
    dispatch(cardSlice.create(card));
    toast.success('Thêm mới thành công');
  };

  const handleCardClick = (cardId: Card['id'], metadata: any, card: Card) => {
    setCurrentCard(cardId);
  };

  const onLaneAdd = (params: Lane) => {
    dispatch(
      laneSlice.createLane({
        id: params.id,
        title: params.title,
        boardId: location.state.board.id,
      })
    );
    toast.success('Thêm mới thành công');
  };

  const onCardDelete = (cardId: any, laneId: any) => {
    dispatch(cardSlice.deleteCard(cardId));
  };

  const handleUpdateCard = (cardId: any, data: Card) => {
    const card = cards.find((card) => card.id === cardId);
    if (!card) return;

    const updatedCard = {
      ...card,
      title: data.title,
    };
    dispatch(cardSlice.updateCard(updatedCard));
  };

  const move = (arr: Card[], old_index: number, new_index: number) => {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while (k-- + 1) {
        // arr.push();
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const checkExit = (card: Card, cards: Card[]) => {
    return cards.find((item) => card.id === item.id);
  };

  const getCardsByLaneId = (laneId: string): Card[] => {
    let lane = data.lanes.find((lane) => lane.id === laneId);
    if (!lane) return [];
    return lane.cards || [];
  };

  const onCardMoveAcrossLanes = (
    fromLaneId: string,
    toLaneId: string,
    cardId: string,
    index: string
  ) => {
    let toLaneCards: Card[] = getCardsByLaneId(toLaneId);
    if (!toLaneCards) return;
    let fromLaneCards: Card[] = getCardsByLaneId(fromLaneId);
    let selectCard = fromLaneCards.find((card) => card.id === cardId);
    if (!selectCard) return;

    selectCard.laneId = toLaneId;
    if (checkExit(selectCard, toLaneCards)) {
      move(toLaneCards, toLaneCards.indexOf(selectCard), parseInt(index));
    } else {
      toLaneCards.splice(parseInt(index), 0, selectCard);
      fromLaneCards.splice(fromLaneCards.indexOf(selectCard), 1);
    }

    for (let i = 0; i < toLaneCards.length; i++) {
      let laneId: number = Number(toLaneCards[i].laneId);
      let card = {
        id: toLaneCards[i].id,
        title: toLaneCards[i].title,
        order: i,
        laneId: laneId,
      };
      dispatch(cardSlice.updateCard(card));
    }
  };

  const handleLaneDragEnd = (removeIndex: number, addedIndex: number) => {
    let dragLane = data.lanes[removeIndex];
    let lane = {
      id: dragLane.id,
      title: dragLane.title,
      boardId: dragLane.boardId,
      order: addedIndex,
    };
    dispatch(laneSlice.updateLane(lane));
    let beDraggedLane = data.lanes[addedIndex];
    let beLane = {
      id: beDraggedLane.id,
      title: beDraggedLane.title,
      boardId: beDraggedLane.boardId,
      order: removeIndex,
    };
    dispatch(laneSlice.updateLane(beLane));
  };

  const closeModal = () => {
    setCurrentCard(null);
  };
  const board = location.state.board;
  const bgs = useSelector((state: RootState) => state.backgrounds).backgrounds;
  const bg = bgs.find((bg) => bg.id === board.backgroundId);

  return (
    <div
      className="w-100 board-trello"
      style={{ backgroundImage: `url(${bg ? bg.url : ''})` }}
    >
      <HeaderProject
        workingSpaceId={location.state.workingSpaceId}
        boardId={location.state.board.id}
        setTypeView={setTypeView}
      />
      {!typeView ? (
        <Board
          style={{
            backgroundColor: 'transparent',
          }}
          components={{
            NewCardForm: CreateCard,
            NewLaneForm: CreateLane,
          }}
          className="board"
          data={data}
          laneDraggable
          cardDraggable
          editable
          canAddLanes
          editLaneTitle
          draggable
          onCardAdd={(card: any) => handleAddCard(card)}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleLaneDragEnd={(removeIndex: any, addedIndex: any) =>
            handleLaneDragEnd(removeIndex, addedIndex)
          }
          onLaneAdd={(params: any) => onLaneAdd(params)}
          onCardDelete={onCardDelete}
          onCardUpdate={handleUpdateCard}
          onCardMoveAcrossLanes={onCardMoveAcrossLanes}
          onCardClick={handleCardClick}
        />
      ) : (
        <TableProject
          workingSpaceId={location.state.workingSpaceId}
          boardId={location.state.board.id}
        />
      )}

      {currentCard && (
        <ModalCard
          cardId={currentCard}
          close={closeModal}
          cards={cards}
          lanes={lanes}
          boardId={location.state.board.id}
        />
      )}
    </div>
  );
}
