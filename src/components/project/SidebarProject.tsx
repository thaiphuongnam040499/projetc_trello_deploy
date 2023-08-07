import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { deleteBoard, findAllBoard } from '../../redux/reducer/boardSlice';
import { BoardType } from '../../types/board.type';
import { findAllBackground } from '../../redux/reducer/backgroundSlice';
import { toast } from 'react-hot-toast';
import { findAllWorkingSpace } from '../../redux/reducer/workingSpaceSlice';
import { WorkingSpaceType } from '../../types/workingSpace.type';

export default function SidebarProject() {
  const boards = useSelector((state: RootState) => state.board.listBoard);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bgImage = useSelector(
    (state: RootState) => state.backgrounds.backgrounds
  );
  const workingSpaces = useSelector(
    (state: RootState) => state.workingSpace.listWorkingSpace
  );
  const workingSpace = workingSpaces.find(
    (item) => item.id === location.state.workingSpaceId
  );
  const listWorkingSpace = useSelector((state: RootState) => {
    return state.workingSpace.listWorkingSpace;
  });

  useEffect(() => {
    dispatch(findAllBackground());
    dispatch(findAllWorkingSpace());
  }, []);

  const handleClickBtn = (
    e: React.FormEvent<HTMLButtonElement>,
    board: BoardType
  ) => {
    e.preventDefault();
    navigate(`project/${board.id}`, {
      state: {
        board: board,

        workingSpaceId: location.state.workingSpaceId,
      },
    });
  };

  const handleClickChart = () => {
    navigate(`chart`, {
      state: {
        board: location.state.board,
        workingSpaceId: location.state.workingSpaceId,
      },
    });
  };

  const handleClickTable = () => {
    navigate(`table`, {
      state: {
        board: location.state.board,
        workingSpaceId: location.state.workingSpaceId,
      },
    });
  };

  const colorCodes = ['#4B0082'];
  const [charColors, setCharColors] = React.useState<any[]>([]);

  const getRandomCharColor = () => {
    const randomIndex = Math.floor(Math.random() * colorCodes.length);
    return colorCodes[randomIndex];
  };

  useEffect(() => {
    const charColorsArray: any[] = [];
    if (listWorkingSpace && listWorkingSpace.length > 0) {
      listWorkingSpace.forEach((workingSpace: WorkingSpaceType) => {
        charColorsArray.push(getRandomCharColor());
      });
    }
    setCharColors(charColorsArray);
  }, [listWorkingSpace]);

  useEffect(() => {
    dispatch(findAllBoard());
  }, []);

  const handleDeleteBoard = (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(deleteBoard(id));
    toast.success('Xóa thành công');
  };
  return (
    <div>
      <div className="flex-shrink-0 p-3 sidebar sidebar-project border-end">
        <ul className="list-unstyled ps-0">
          <li>
            <div className="d-flex align-items-center">
              <div
                className="charAt me-2"
                style={{
                  backgroundColor: charColors[0],
                }}
              >
                <p className="text-center text-white">
                  {workingSpace?.name.charAt(0).toUpperCase()}
                </p>
              </div>
              <p className="m-0 fs-5 font">{workingSpace?.name}</p>
            </div>
          </li>
          <hr className="my-3" />
          <li className="mb-1">
            <button
              className="btn btn-toggle w-100 text-start sidebar-btn align-items-center rounded collapsed  "
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="false"
              onClick={handleClickTable}
            >
              <i className="bi bi-trello px-2"></i>
              Bảng
            </button>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle w-100 text-start sidebar-btn align-items-center rounded collapsed "
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              <i className="bi bi-person px-2"></i>
              Thành viên
            </button>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle w-100 text-start sidebar-btn align-items-center rounded collapsed "
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse"
              aria-expanded="false"
            >
              <i className="bi bi-gear px-2"></i>
              Các cài đặt không gian làm việc
            </button>
            <div className="collapse" id="orders-collapse"></div>
          </li>
          <li className="border-top my-3" />
        </ul>
        <ul className="list-unstyled ps-0">
          <li>
            <p>Dạng xem không gian làm việc</p>
          </li>

          <li className="list-unstyled ps-0">
            <button
              onClick={handleClickChart}
              className="btn btn-toggle w-100 text-start sidebar-btn align-items-center rounded collapsed"
            >
              <i className="bi bi-bar-chart px-2"></i>
              Chart
            </button>
          </li>
        </ul>
        <ul className="list-unstyled ps-0 ">
          <li>
            <p>Các bảng của bạn</p>
          </li>
          <div className="boards scrollbar scrollbar-indigo bordered-black thin">
            {boards.map((board) => {
              if (board.workingSpaceId === location.state.workingSpaceId) {
                return (
                  <li key={board.id} className="mb-1 ">
                    {bgImage.map((bg) => {
                      if (bg.id === board.backgroundId) {
                        return (
                          <button
                            key={bg.id}
                            className="btn btn-toggle w-100 text-start sidebar-btn align-items-center rounded collapsed d-flex justify-content-between"
                            data-bs-toggle="collapse"
                            data-bs-target="#home-collapse"
                            aria-expanded="false"
                            onClick={(e) => handleClickBtn(e, board)}
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={bg.url}
                                alt=""
                                className="image-board"
                              />
                              <div className="board-name">{board.name}</div>
                            </div>

                            <div className="dropdown">
                              <button
                                className="btn btn-ligth me-2 btn-ws"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="bi bi-three-dots"></i>
                              </button>
                              <ul
                                className="dropdown-menu btn-delete-ws"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li className="text-center">
                                  <p>Xóa không gian làm việc</p>
                                </li>
                                <hr className="my-2" />
                                <li className="p-2">
                                  <button
                                    className=" border rounded btn btn-light w-100"
                                    onClick={(e) =>
                                      handleDeleteBoard(e, board.id)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </button>
                        );
                      }
                    })}
                  </li>
                );
              }
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}
