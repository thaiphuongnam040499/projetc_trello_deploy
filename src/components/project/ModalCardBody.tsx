import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import * as listTaskSlice from '../../redux/reducer/listTaskSlice';
import Task from './Task';
import * as dateTimeSlice from '../../redux/reducer/dateTimeSlice';
import { DateTime } from '../../types/dateTime.type';
import { findAllMemberCard } from '../../redux/reducer/memberCardSlice';
import { findAllCardTag } from '../../redux/reducer/cardTagSlice';
import { toast } from 'react-hot-toast';
import { updateCard } from '../../redux/reducer/cardSlice';
import { Card } from '../../types/lanes.type';
import FormCreateDescription from './FormCreateDescription';

interface ModalCardBodyProps {
  cardId: string;
  boardId: string;
}

export default function ModalCardBody({ cardId, boardId }: ModalCardBodyProps) {
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowDis, setIsShowDis] = useState(false);
  const [isShowDisUp, setIsShowDisUp] = useState(false);
  const [disUp, setDisUp] = useState('');
  const dispatch = useDispatch();
  const listTask = useSelector((state: RootState) => state.listTask.listTask);
  const dateTimes = useSelector((state: RootState) => state.dateTime.dateTimes);
  const cards = useSelector((state: RootState) => state.card.listCard);
  const members = useSelector(
    (state: RootState) => state.memberCards.listMemberCard
  );
  const member = members.find((item) => item.cardId === cardId);
  const card = cards.find((item) => item.description != '');

  const bgColors = useSelector((state: RootState) => state.cardTags.cardTags);
  const bgColor = bgColors.find((item) => item.cardId === cardId);

  useEffect(() => {
    dispatch(dateTimeSlice.findAllDateTime());
    dispatch(findAllMemberCard());
    dispatch(findAllCardTag());
  }, []);

  useEffect(() => {
    dispatch(listTaskSlice.findAllListTask());
  }, []);

  const handleShowComment = () => {
    setIsShowComment(true);
  };

  const handleShowDisUp = () => {
    setIsShowDisUp(true);
  };

  const handleOffDisUp = () => {
    setIsShowDisUp(false);
  };

  const handleShowDis = () => {
    setIsShowDis(true);
  };

  const handleOffShowDis = () => {
    setIsShowDis(false);
  };

  const handleDeleteListTask = (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(listTaskSlice.deleteListTask(id));
    toast.success('Xóa thành công');
  };

  const handleChangeStatus = (
    dateTime: DateTime,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCheckedValue = e.target.checked;
    let uDateTime = {
      ...dateTime,
      status: newCheckedValue,
    };
    dispatch(dateTimeSlice.updateDateTime(uDateTime));
  };

  const handleUpdateDes = (
    e: React.FormEvent<HTMLButtonElement>,
    card: Card
  ) => {
    e.preventDefault();
    if (disUp != '') {
      dispatch(
        updateCard({
          ...card,
          description: disUp,
        })
      );
      handleOffShowDis();
      toast.success('Sửa thành công');
    } else {
      toast.error('Hãy nhập đầy đủ thông tin!');
    }
  };

  return (
    <form className="card-modal-body">
      <div className="ms-3 ps-2 px-2 mb-2 d-flex flex-wrap">
        {member ? (
          <div className="me-3 mt-2 mb-2">
            <div>
              <p>Thành viên</p>
            </div>
            <div className="d-flex">
              {members.map((item) => {
                if (item.cardId === cardId) {
                  return (
                    <div key={item.id}>
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="member-input"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          ''
        )}

        {bgColor ? (
          <div className="me-3 mt-2 mb-2">
            <div>
              <p>Nhãn</p>
            </div>
            <div className="d-flex">
              {bgColors.map((bgColor) => {
                if (bgColor.cardId === cardId) {
                  return (
                    <div
                      key={bgColor.id}
                      className={`${
                        bgColor.name === ''
                          ? 'btn btn-bgColor me-1'
                          : 'btn me-1'
                      }`}
                      style={{ backgroundColor: bgColor.backgroundColor }}
                    >
                      <div>
                        <p className="text-white">{bgColor.name}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          ''
        )}

        {dateTimes.map((dateTime: DateTime) => {
          if (dateTime.cardId === cardId) {
            let dateNow = new Date();
            console.log(dateNow);

            let date = new Date(dateTime.expirationDate);
            return (
              <div className="mt-2 mb-2" key={dateTime.id}>
                <p>Ngày hết hạn</p>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={dateTime.status}
                    onChange={(e) => handleChangeStatus(dateTime, e)}
                  />
                  <div>
                    {dateNow >= date ? (
                      <button
                        type="button"
                        className="btn btn-light border rounded"
                      >
                        {`${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()} lúc ${date.getHours()}:${date.getMinutes()}`}
                        <span className="bg-danger ms-2 text-white">
                          Hết hạn
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-light border rounded"
                      >
                        {`${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()} lúc ${date.getHours()}:${date.getMinutes()}`}
                        {dateTime.status ? (
                          <span className="bg-success ms-2 text-white">
                            Hoàn tất
                          </span>
                        ) : (
                          ''
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="ps-2 px-2 mb-2">
        <div className="d-flex">
          <i className="bi bi-justify-left me-2"></i>
          <h6>Mô tả</h6>
        </div>
        {card?.description ? (
          <div>
            {cards.map((card) => {
              if (card.id === cardId) {
                return (
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="ms-5 mb-2" key={card.id}>
                      {card.description}
                    </p>
                    {isShowDisUp ? (
                      <div>
                        <input
                          type="text"
                          className="input-dis m-3"
                          placeholder="Thêm mô tả chi tiết hơn..."
                          onChange={(e) => setDisUp(e.target.value)}
                        />
                        <div className="d-flex ms-3 mb-3">
                          <button
                            className="btn btn-primary me-2"
                            onClick={(e) => handleUpdateDes(e, card)}
                          >
                            Lưu
                          </button>
                          <button
                            className="btn btn-light"
                            onClick={handleOffDisUp}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleShowDisUp}
                        className="btn btn-light border rounded"
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div>
            {isShowDis ? (
              <FormCreateDescription
                handleOffShowDis={handleOffShowDis}
                cardId={cardId}
              />
            ) : (
              <button
                type="button"
                onClick={handleShowDis}
                className="btn btn-light border rounded w-100 mb-3"
              >
                Thêm mô tả chi tiết hơn
              </button>
            )}
          </div>
        )}

        {listTask.map((listTask) => {
          if (listTask.cardId === cardId) {
            return (
              <div key={listTask.id}>
                <div className="ps-2 px-2 mb-2">
                  <div className="d-flex justify-content-between  ">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2-square me-2"></i>
                      <h6 className="m-0 p-0">{listTask.name}</h6>
                    </div>
                    <div>
                      <button
                        className="btn btn-light border rounded"
                        onClick={(e) => handleDeleteListTask(e, listTask.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                <Task boardId={boardId} listTask={listTask} />
              </div>
            );
          }
        })}
      </div>
      <div className="ps-2 px-2 mb-2">
        <div className="d-flex">
          <i className="bi bi-body-text me-2"></i>
          <h6>Hoạt động</h6>
        </div>
        {isShowComment ? (
          <div className="">
            <input
              type="text"
              className="input-comment m-3"
              placeholder="Hãy viết bình luận của bạn"
            />
            <div className="d-flex align-items-center ms-3">
              <button className="btn btn-primary me-2">Lưu</button>
              <input type="checkbox" className="ms-3" />
              <p className="ms-2">Theo dõi</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-light border rounded w-100 mb-5"
            onClick={handleShowComment}
          >
            Viết bình luận...
          </button>
        )}
      </div>
    </form>
  );
}
