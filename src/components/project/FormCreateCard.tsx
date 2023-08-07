import React, { useState, useEffect } from 'react';
import { FormState } from 'react-trello-ts/dist/components/NewCardForm';
const initialState = {
  title: '',
  description: '',
  label: '',
  laneId: '',
};
export default function CreateCard(props: {
  onCancel: () => void;
  onAdd: (formState: FormState) => void;
  laneId: string;
}) {
  const [card, setCard] = useState<FormState>(initialState);

  return (
    <div className="ps-2 px-2 mb-2">
      <div>
        <div>
          <input
            onChange={(e) =>
              setCard((prev: FormState) => ({
                ...prev,
                title: e.target.value,
                laneId: props.laneId,
              }))
            }
            placeholder="Thêm tiêu đề cho thẻ này"
            className="border rounded w-100 input-create-card"
          />
        </div>
        <div>
          <button onClick={() => props.onAdd(card)} className="btn btn-primary">
            Thêm thẻ
          </button>
          <button onClick={props.onCancel} className="btn btn-light">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
