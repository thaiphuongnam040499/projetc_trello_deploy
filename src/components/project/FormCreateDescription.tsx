import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { findAllCard, updateCard } from '../../redux/reducer/cardSlice';
import { Toaster, toast } from 'react-hot-toast';

interface CreateDiscriptionProps {
  cardId: string;
  handleOffShowDis: () => void;
}

export default function FormCreateDescription({
  handleOffShowDis,
  cardId,
}: CreateDiscriptionProps) {
  const [description, setDescription] = useState('');
  const cards = useSelector((state: RootState) => state.card.listCard);
  const card = cards.filter((card) => card.id === cardId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllCard());
  }, []);

  const handleCreateDes = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (description != '') {
      let uCard = {
        ...card[0],
        description: description,
      };
      dispatch(updateCard(uCard));
      toast.success('Thêm mới thành công');
    } else {
      toast.error('Hãy nhập đầy đủ thông tin!');
    }
  };

  return (
    <div>
      <Toaster />
      <input
        type="text"
        className="input-dis m-3"
        placeholder="Thêm mô tả chi tiết hơn..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="d-flex ms-3 mb-3">
        <button className="btn btn-primary me-2" onClick={handleCreateDes}>
          Lưu
        </button>
        <button className="btn btn-light" onClick={handleOffShowDis}>
          Hủy
        </button>
      </div>
    </div>
  );
}
