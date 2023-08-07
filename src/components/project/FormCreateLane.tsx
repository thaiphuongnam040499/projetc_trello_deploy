import React, { useState } from 'react';

const initialState = {
  id: '',
  title: '',
};

export default function CreateLane(props: {
  onCancel: () => void;
  onAdd: ({ id, title }: { id: string; title: string }) => void;
}) {
  const [lane, setLane] = useState<any>(initialState);
  return (
    <div className="ms-3">
      <div className="p-2 bg-white create-list">
        <input
          onChange={(e) =>
            setLane((prev: any) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Nhập tiêu đề danh sách"
          className="border rounded w-100 input-create-list"
        />
        <div>
          <button
            className="btn btn-primary mt-2 "
            onClick={() => props.onAdd(lane)}
          >
            Thêm danh sách
          </button>
          <button className="btn btn-light" onClick={props.onCancel}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      {/* <button
        onClick={handleShowInput}
        type="submit"
        className="btn btn-light w-100 text-start"
      >
        <i className="bi bi-plus-lg mx-2"></i>
        Thêm danh sách khác
      </button> */}
    </div>
  );
}
