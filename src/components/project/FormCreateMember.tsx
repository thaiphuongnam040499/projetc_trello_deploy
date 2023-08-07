import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MemberId } from '../../types/member.type';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Card } from 'react-trello-ts/dist/types/Board';
import {
  createMemberCard,
  deleteMemberCard,
  findAllMemberCard,
} from '../../redux/reducer/memberCardSlice';
import { toast } from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';

interface CreateMemberProps {
  cardId: string;
  cards: Card[];
  boardId: string;
  memberArr?: MemberId[];
}

export default function FormCreateMember({
  cardId,
  cards,
  boardId,
  memberArr,
}: CreateMemberProps) {
  const cardDetail = cards.find((item) => item.id === cardId);
  const members = useSelector((state: RootState) => state.members.members);
  const memberCards = useSelector(
    (state: RootState) => state.memberCards.listMemberCard
  );

  useEffect(() => {
    dispatch(findAllMemberCard());
  }, []);

  const dispatch = useDispatch();

  const memberCardFilter = memberCards.filter(
    (memberCard) => memberCard.cardId === cardId
  );

  const handleClick = (
    e: React.FormEvent<HTMLButtonElement>,
    member: MemberId
  ) => {
    e.preventDefault();
    let check = memberCardFilter.find((item) => item.email === member.email);
    if (!check) {
      dispatch(
        createMemberCard({
          memberId: member.id,
          name: member.name,
          email: member.email,
          imageUrl: member.imageUrl,
          role: member.role,
          cardId: cardId,
        })
      );
      toast.success('Thêm mới thành công');
    } else {
      let memberItem = memberCardFilter.find(
        (item) => item.memberId === member.id
      );
      dispatch(deleteMemberCard(memberItem?.id));
      toast.success('Gỡ bỏ thành công');
    }
  };

  return (
    <ul
      className="dropdown-menu p-2 member-list"
      aria-labelledby="dropdownMenuButton1"
    >
      <li>
        <p className="text-center">Thành viên</p>
      </li>
      <li className="mb-2 mt-2">
        <input
          type="text"
          className="w-100 border rounded list-member-input"
          placeholder="Tìm kiếm các thành viên"
        />
      </li>
      <li>
        <p className="fs-6">Thành viên của bảng</p>
      </li>
      <li className="mb-2 mt-2">
        {members.map((member) => {
          if (member.boardId === boardId) {
            return (
              <button
                key={member.id}
                className="d-flex align-items-center mb-2 btn btn-light w-100"
                onClick={(e) => handleClick(e, member)}
              >
                <img src={member.imageUrl} alt="" className="member-input" />
                <p className="ms-2">{member.email}</p>
              </button>
            );
          }
        })}
      </li>
    </ul>
  );
}
