import React, { useEffect, useState } from 'react';
import { BgColor } from '../../types/bColor.type';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { findAllDateTime } from '../../redux/reducer/dateTimeSlice';
import { findAllMemberCard } from '../../redux/reducer/memberCardSlice';
import {
  createCardTag,
  deleteCardTag,
  findAllCardTag,
  updateCardTag,
} from '../../redux/reducer/cardTagSlice';
import { findAllBgColor } from '../../redux/reducer/backgroundSlice';
import { Card } from '../../types/lanes.type';
import { toast } from 'react-hot-toast';

interface CreateTagProps {
  cardId: string;
  cards: Card[];
}

export default function FormCreateTag({ cardId, cards }: CreateTagProps) {
  const bgColors = useSelector(
    (state: RootState) => state.backgrounds.backgroundColors
  );
  const cardTags = useSelector((state: RootState) => state.cardTags.cardTags);
  const cardTagFilter = cardTags.filter((cardTag) => cardTag.cardId === cardId);
  const [checkedValue, setCheckedValue] = useState<string[]>([]);
  const [isShowUpdate, setIsShowUpdate] = useState({
    id: '',
    start: false,
  });
  const [cardTagName, setCardTagName] = useState('');
  const dispatch = useDispatch();

  const handleShowUp = (bgColor: BgColor) => {
    setIsShowUpdate({
      id: bgColor.id,
      start: true,
    });
  };

  const handleOffShowUp = () => {
    setIsShowUpdate({
      id: '',
      start: false,
    });
  };

  useEffect(() => {
    dispatch(findAllBgColor());
    dispatch(findAllCardTag());
  }, []);

  useEffect(() => {
    let temps = [];
    for (let index = 0; index < cardTagFilter.length; index++) {
      let temp = bgColors.find((bg) => bg.id === cardTagFilter[index].tagId);
      if (!temp) return;
      temps.push(temp.id);
    }
    setCheckedValue(temps);
  }, [cardTags]);

  useEffect(() => {
    dispatch(findAllDateTime());
    dispatch(findAllMemberCard());
    dispatch(findAllCardTag());
  }, []);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    bgColor: BgColor
  ) => {
    let checkedValueInput = e.target.checked;

    let check = cardTagFilter.find((cardTag) => cardTag.tagId === bgColor.id);
    if (!check && checkedValueInput) {
      dispatch(
        createCardTag({
          cardId: cardId,
          tagId: bgColor.id,
          backgroundColor: bgColor.backgroundColor,
          name: '',
        })
      );
      toast.success('Thêm mới thành công');
    } else {
      let cardTagItem = cardTagFilter.find(
        (cardTag) => cardTag.tagId === bgColor.id
      );
      dispatch(deleteCardTag(cardTagItem?.id));
      toast.success('Gỡ bỏ thành công');
    }
  };

  const handleUpdateCardTag = (
    e: React.FormEvent<HTMLButtonElement>,
    bgColor: BgColor
  ) => {
    e.preventDefault();
    let tag = cardTagFilter.find((item) => item.tagId === bgColor.id);
    if (cardTagName != '') {
      dispatch(
        updateCardTag({
          ...tag,
          name: cardTagName,
        })
      );
      handleOffShowUp();
      toast.success('Cập nhật thành công');
    } else {
      toast.error('Hãy nhập đầy đủ thông tin!');
    }
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
        <i className="bi bi-tags me-2"></i>
        Nhãn
      </button>
      {isShowUpdate.start ? (
        <ul className="tag p-2 border update-tag ">
          <li className="mt-2 mb-2 d-flex align-items-center">
            <button
              className="btn btn-light"
              type="button"
              onClick={handleOffShowUp}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <p className="text-center tag-title">Nhãn</p>
          </li>
          <li>
            <div className="">
              <div>
                {bgColors.map((bgColor) => {
                  if (bgColor.id === isShowUpdate.id) {
                    return (
                      <div key={bgColor.id} className="mt-2 mb-2">
                        <button
                          style={{
                            backgroundColor: bgColor.backgroundColor,
                          }}
                          className="tag-item btn border rounded ms-2 me-2"
                        ></button>
                        <div className="mt-2">
                          <p className="mb-2">Tiêu đề</p>
                          <input
                            type="text"
                            onChange={(e) => setCardTagName(e.target.value)}
                            className="input-update-tag border rounded p-2"
                          />
                          <button
                            onClick={(e) => handleUpdateCardTag(e, bgColor)}
                            className="btn btn-primary"
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul
          className="dropdown-menu tag p-2 border "
          aria-labelledby="dropdownMenuButton1"
        >
          <li className="mt-2 mb-2">
            <p className="text-center">Nhãn</p>
          </li>
          <li className="mb-2">
            <input
              type="text"
              placeholder="Tìm nhãn..."
              className="border rounded list-member-input w-100"
            />
          </li>
          <li className="mt-2 mb-2">
            <p>Nhãn</p>
          </li>
          <li>
            <div className="">
              <div>
                {bgColors.map((bgColor) => {
                  return (
                    <div
                      key={bgColor.id}
                      className="d-flex align-items-center mt-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        className="ms-2"
                        checked={checkedValue.includes(bgColor.id)}
                        onChange={(e) => handleChangeCheckbox(e, bgColor)}
                      />
                      <button
                        style={{
                          backgroundColor: bgColor.backgroundColor,
                        }}
                        className="tag-item btn border rounded ms-2 me-2"
                      ></button>
                      <button
                        onClick={() => handleShowUp(bgColor)}
                        className="btn btn-edit-tag"
                      >
                        <i className="bi bi-pen-fill pen-edit-tag "></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
