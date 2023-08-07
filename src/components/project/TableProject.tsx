import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { findAllLane } from '../../redux/reducer/laneSlice';
import { findAllCard } from '../../redux/reducer/cardSlice';
import { findUserByEmail } from '../../redux/reducer/userSlice';
import { useLocation } from 'react-router-dom';
import { UserId } from '../../types/user.type';
import CreateDateTime from './FormCreateDateTime';
import CreateMember from './FormCreateMember';
import { findAllDateTime } from '../../redux/reducer/dateTimeSlice';

interface TableProjectProps {
  workingSpaceId: string;
  boardId: string;
}

export default function TableProject({
  workingSpaceId,
  boardId,
}: TableProjectProps) {
  const cards = useSelector((state: RootState) => state.card.listCard);
  const lanes = useSelector((state: RootState) => state.lanes.lanes);
  const dispatch = useDispatch();
  const members = useSelector(
    (state: RootState) => state.memberCards.listMemberCard
  );
  const userSearch = useSelector((state: RootState) => state.user.listUser);
  const location = useLocation();
  const [memberSearch, setMemberSearch] = useState('');
  const currentUser = localStorage.getItem('userLogin');
  const [userLogin, setUserLogin] = useState<UserId>();
  const dateTimes = useSelector((state: RootState) => state.dateTime.dateTimes);

  useEffect(() => {
    if (currentUser) {
      setUserLogin(JSON.parse(currentUser).user);
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(findAllLane());
  }, []);

  useEffect(() => {
    dispatch(findAllCard());
    dispatch(findAllDateTime());
  }, []);

  useEffect(() => {
    dispatch(findUserByEmail(memberSearch));
  }, [memberSearch]);

  return (
    <div className=" table-project bg-white">
      <table className="table ">
        <thead>
          <tr className="text-center">
            <th scope="col">Thẻ</th>
            <th scope="col">Danh sách</th>
            <th scope="col">Thành viên</th>
            <th scope="col">Ngày hết hạn</th>
          </tr>
        </thead>

        <tbody className="">
          {lanes.map((lane) => {
            if (lane.boardId === boardId) {
              return cards.map((card) => {
                if (lane.id === card.laneId) {
                  return (
                    <tr key={card.id}>
                      <td scope="row text-start">{card.title}</td>
                      <td>
                        <div key={lane.id} className="dropdown">
                          <button
                            className="btn btn-light"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {lane.title}
                          </button>
                          <ul
                            className="dropdown-menu p-2 list-member"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <p className="text-center">Thay đổi danh sách</p>
                            </li>
                            <hr className="my-2" />
                            <li>
                              <p></p>
                            </li>
                            <li className=" mt-2 mb-2">
                              <input
                                type="text"
                                placeholder="Tìm kiếm các danh sách"
                                className="list-member-input"
                              />
                            </li>
                            <li>
                              <p>{lane.title}</p>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-around">
                          <div className="d-flex">
                            {members.map((item) => {
                              if (item.cardId === card.id) {
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
                      </td>
                      <td>
                        {dateTimes.map((dateTime) => {
                          if (dateTime.cardId === card.id) {
                            let date = new Date(dateTime.expirationDate);
                            return (
                              <div
                                className="mt-2 mb-2 text-success text-center"
                                key={dateTime.id}
                              >
                                {`Ngày ${date.getDate()} tháng ${
                                  date.getMonth() + 1
                                } năm ${date.getFullYear()}`}
                                {dateTime.status ? (
                                  <span className="bg-success ms-2 text-white">
                                    Hoàn tất
                                  </span>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            );
                          }
                        })}
                      </td>
                    </tr>
                  );
                }
              });
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
