import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  findAllCard,
  findCardByTitle,
  getCardFilter,
} from '../../redux/reducer/cardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MemberId } from '../../types/member.type';
import { Role } from '../../enums/Role';
import { findAllMemberCard } from '../../redux/reducer/memberCardSlice';
import { Card } from '../../types/lanes.type';

interface FilterProps {
  listMember: MemberId[];
  boardId: string;
}

export default function Filter({ listMember, boardId }: FilterProps) {
  const userLocal = localStorage.getItem('userLogin');
  const currentUser = userLocal ? JSON.parse(userLocal) : null;

  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.card.listCard);
  const memberCards = useSelector(
    (state: RootState) => state.memberCards.listMemberCard
  );
  const [isCheckedMemberMe, setIsCheckedMemberMe] = useState(false);
  const [isCheckedMember, setIsCheckedMember] = useState<MemberId | null>(null);
  const [memberCardFilter, setMemberCardFilter] = useState<MemberId[]>([]);
  const [isCheckedNoMember, setIsCheckedNoMember] = useState(false);
  const [isShowMember, setIsShowMember] = useState(false);
  useEffect(() => {
    dispatch(findAllMemberCard());
  }, []);

  // Không có thành viên
  useEffect(() => {
    if (isCheckedNoMember) {
      let cardArr = [...cards];
      for (let i = 0; i < memberCards.length; i++) {
        let card = cards.find((card) => card.id === memberCards[i].cardId);
        if (!card) return;
        removeFromArr(cardArr, card);
      }
      dispatch(getCardFilter(cardArr));
    } else {
      dispatch(findAllCard());
    }
  }, [isCheckedNoMember]);

  const removeFromArr = (arr: Card[], card: Card) => {
    let index = arr.indexOf(card);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  // Các card của tôi
  useEffect(() => {
    if (!currentUser) return;
    if (isCheckedMemberMe) {
      let cardArr = [];
      for (let i = 0; i < memberCards.length; i++) {
        let card = cards.find(
          (card) =>
            card.id === memberCards[i].cardId &&
            memberCards[i].email === currentUser.user.email
        );
        if (
          card?.id === memberCards[i].cardId &&
          memberCards[i].email === currentUser.user.email
        ) {
          cardArr.push(card);
        }
      }
      dispatch(getCardFilter(cardArr));
    } else {
      dispatch(findAllCard());
    }
  }, [isCheckedMemberMe]);

  // các card của thành viên
  useEffect(() => {
    let arrMemberFilter: any[] = [];
    if (isCheckedMember) {
      const members = memberCards.filter(
        (item) => item.email === isCheckedMember?.email
      );
      console.log(members);

      for (let i = 0; i < members.length; i++) {
        let card = cards.find((item) => item.id === members[i].cardId);
        arrMemberFilter.push(card);
      }
      dispatch(getCardFilter(arrMemberFilter));
    } else {
      dispatch(findAllCard());
    }
  }, [isCheckedMember]);

  const handleChangeSearchCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(findCardByTitle(e.target.value));
  };

  const handleSearchCardByMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedMemberMe(e.target.checked);
  };

  const handleShowMember = () => {
    if (isShowMember) {
      setIsShowMember(false);
    } else {
      setIsShowMember(true);
    }
  };

  return (
    <div className="dropdown me-3">
      <button
        className="btn btn-light btn-filter"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-filter me-2"></i>
        Lọc
      </button>
      <ul
        className="dropdown-menu p-3 filter-dropdown"
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <p>Từ khóa</p>
          <input
            type="text"
            className="w-100 input-date border rounded mt-1 mb-1 p-2"
            onChange={(e) => {
              handleChangeSearchCard(e);
            }}
          />
          <p>Tìm kiếm các thẻ, các nhãn, các thành viên </p>
        </li>
        <li className="mt-2">
          <p className="">Thành viên</p>
          <div className="d-flex align-items-center ms-2 mt-3">
            <input
              type="checkbox"
              className="me-2"
              checked={isCheckedNoMember}
              onChange={(e) => setIsCheckedNoMember(e.target.checked)}
            />
            <div>
              <i className="bi bi-person me-2"></i>Không có thành viên
            </div>
          </div>
          <div className="d-flex align-items-center ms-2 mt-3">
            <input
              type="checkbox"
              className="me-2"
              checked={isCheckedMemberMe}
              onChange={handleSearchCardByMe}
            />
            {listMember.map((member) => {
              if (member.boardId === boardId && member.role === Role.ADMIN) {
                return (
                  <div key={member.id}>
                    {' '}
                    <img
                      src={member.imageUrl}
                      alt=""
                      className="me-2 member-filter"
                    />
                    Các thẻ đã chỉ định cho tôi
                  </div>
                );
              }
            })}
          </div>
          <div className="d-flex align-items-center ms-2 mt-3">
            {/* <input type="checkbox" className="me-2 align-items-center" /> */}
            <div className="select-filter">
              <button
                className="btn btn-light w-100 btn-show-member"
                onClick={handleShowMember}
              >
                <input
                  type="text"
                  value={'Chọn thành viên'}
                  className="w-100 input-date p-2 input-member-cursor"
                />
                <i className="bi bi-chevron-compact-down icon-select"></i>
              </button>
            </div>
            {isShowMember ? (
              <div className="ms-2 mt-3 member-filter-input border rounded p-3 pb-0">
                {listMember.map((member) => {
                  if (
                    member.boardId === boardId &&
                    member.role === Role.MEMBER
                  ) {
                    return (
                      <div
                        key={member.id}
                        className="d-flex mb-3 align-items-center"
                      >
                        <input
                          type="checkbox"
                          className="me-3"
                          // checked={selectedMemberId === member.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setIsCheckedMember(member);
                            } else {
                              setIsCheckedMember(null);
                            }
                          }}
                        />
                        <div className="d-flex ">
                          <img
                            src={member.imageUrl}
                            alt=""
                            className="me-2 member-filter"
                          />
                          <p className="member-name">{member.email}</p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              ''
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
