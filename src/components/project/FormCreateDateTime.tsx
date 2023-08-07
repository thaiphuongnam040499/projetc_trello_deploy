import React, { useState, useEffect } from 'react';
import { DateTime } from '../../types/dateTime.type';
import { useDispatch } from 'react-redux';
import * as dateTimeSlice from '../../redux/reducer/dateTimeSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-hot-toast';

interface CreateDateTimeProps {
  cardId: string;
}

const initialState = {
  id: '',
  startDay: '',
  expirationDate: '',
  cardId: '',
  status: false,
};

export default function FormCreateDateTime({ cardId }: CreateDateTimeProps) {
  const [dateTime, setDateTime] = useState<DateTime>(initialState);
  const dateTimes = useSelector((state: RootState) => state.dateTime.dateTimes);
  const dispatch = useDispatch();

  const dateTimeCurrent = dateTimes.find((item) => item.cardId === cardId);

  useEffect(() => {
    dispatch(dateTimeSlice.findAllDateTime());
  }, []);

  useEffect(() => {
    setDateTime({
      ...dateTime,
      cardId: cardId,
    });
  }, []);

  const handleCreateDateTime = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let datetime = dateTimes.find((item) => item.cardId === cardId);
    if (datetime) {
      if (datetime?.cardId === cardId) {
        let uDateTime = {
          ...datetime,
          expirationDate: dateTime.expirationDate,
        };
        dispatch(dateTimeSlice.updateDateTime(uDateTime));
        toast.success('Sửa thành công');
      }
    } else if (dateTime.expirationDate != '' && dateTime.startDay != '') {
      dispatch(dateTimeSlice.createDateTime(dateTime));
      toast.success('Thêm mới thành công');
    } else {
      toast.error('Hãy nhập đầy đủ thông tin');
    }
  };

  const handleDeleteDateTime = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(dateTimeSlice.deleteDateTime(dateTimeCurrent?.id));
    toast.success('Xóa thành công');
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-light w-100 border rounded mb-2  text-start"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-clock me-2"></i>
        Ngày
      </button>
      <ul
        className="dropdown-menu date-time"
        aria-labelledby="dropdownMenuButton1"
      >
        <li className="text-center">Ngày</li>
        <hr className="my-2" />
        <li className="p-2">
          <div>
            <p className="mb-2">Ngày bắt đầu:</p>
            <input
              type="date"
              className="w-100 mb-2 input-date border rounded p-3"
              value={dateTime.startDay}
              onChange={(e) =>
                setDateTime((prev) => ({ ...prev, startDay: e.target.value }))
              }
            />
            <p className="mb-2">Ngày hết hạn:</p>
            <input
              type="datetime-local"
              className="w-100 mb-2 input-date border rounded p-3"
              value={dateTime.expirationDate}
              onChange={(e) =>
                setDateTime((prev) => ({
                  ...prev,
                  expirationDate: e.target.value,
                }))
              }
            />
            <div>
              <button
                className="btn btn-primary w-100 mb-2 mt-2"
                onClick={handleCreateDateTime}
              >
                Lưu
              </button>
              <button
                onClick={handleDeleteDateTime}
                className="btn btn-secondary w-100"
              >
                Gỡ bỏ
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
