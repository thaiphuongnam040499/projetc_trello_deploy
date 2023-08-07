import React, { useState, useEffect } from 'react';
import { ListTask } from '../../types/listTask.type';
import { useDispatch } from 'react-redux';
import { createListTask } from '../../redux/reducer/listTaskSlice';
import { Toaster, toast } from 'react-hot-toast';

interface CreateListTaskProps {
  cardId: string;
}

const initialState = {
  id: '',
  cardId: '',
  name: '',
  status: false,
  complete: 0,
};

export default function FormCreateListTask({ cardId }: CreateListTaskProps) {
  const [listTask, setListTask] = useState<ListTask>(initialState);

  const dispatch = useDispatch();

  const handleAddList = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (listTask.name != '') {
      dispatch(
        createListTask({
          ...listTask,
          cardId: cardId,
        })
      );
      toast.success('Thêm mới thành công');
    } else {
      toast.error('Hãy nhập đầy đủ các thông tin!');
    }
  };
  return (
    <div className="dropdown">
      <Toaster />
      <button
        className="btn btn-light w-100 border rounded mb-2 text-start "
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-check2-square me-2"></i>
        Thêm công việc
      </button>
      <ul
        className="dropdown-menu list-task"
        aria-labelledby="dropdownMenuButton1"
      >
        <li className="p-2">
          <p className="mb-2">Tiêu đề</p>
          <input
            type="text"
            className="w-100 mb-2 input-list-task border rounded"
            placeholder="nhập tiêu đề..."
            value={listTask.name}
            onChange={(e) =>
              setListTask((prev: ListTask) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <button className="btn btn-primary" onClick={handleAddList}>
            Thêm
          </button>
        </li>
      </ul>
    </div>
  );
}
