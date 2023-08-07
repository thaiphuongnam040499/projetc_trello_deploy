import { Card } from 'react-trello-ts/dist/types/Board';
import ModalCardBody from './ModalCardBody';
import { Lane } from '../../types/lanes.type';
import FormCreateListTask from './FormCreateListTask';
import FormCreateMember from './FormCreateMember';
import FormCreateDateTime from './FormCreateDateTime';
import FormCreateTag from './FormCreateTag';

interface ModalCardProps {
  cardId: string;
  close: () => void;
  cards: Card[];
  lanes: Lane[];
  boardId: string;
}

export default function ModalCard({
  cardId,
  close,
  cards,
  lanes,
  boardId,
}: ModalCardProps) {
  const cardDetail = cards.find((item) => item.id === cardId);

  return (
    <div className="showModal">
      <div className="modal-dialog card-modal ">
        <div className="modal-content card-modal-content ">
          <div className="modal-header">
            {lanes.map((lane) => {
              if (lane.id === cardDetail?.laneId) {
                return (
                  <div key={lane.id}>
                    <h5 className="modal-title" id="exampleModalLabel">
                      {cardDetail?.title}
                    </h5>
                    <p>Trong danh sách {lane.title}</p>
                  </div>
                );
              }
            })}

            <button
              type="button"
              onClick={close}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body modal-body-board d-flex scrollbar scrollbar-indigo bordered-indigo thin">
            <ModalCardBody boardId={boardId} cardId={cardId} />
            <form className="create-tag">
              <div className="ms-3 ps-2 px-2 mb-2">
                <p>Thêm vào thẻ</p>
                <div className="dropdown">
                  <button
                    className="btn btn-light w-100 border rounded mb-2 text-start"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-people me-2"></i>
                    Thành viên
                  </button>
                  <FormCreateMember
                    cards={cards}
                    boardId={boardId}
                    cardId={cardId}
                  />
                </div>
                <FormCreateListTask cardId={cardId} />
                <FormCreateDateTime cardId={cardId} />
                <FormCreateTag cards={cards} cardId={cardId} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
