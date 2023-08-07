import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  deleteWs,
  findAllWorkingSpace,
} from '../../redux/reducer/workingSpaceSlice';
import { findAllBoard } from '../../redux/reducer/boardSlice';
import { BoardType } from '../../types/board.type';
import { findAllBackground } from '../../redux/reducer/backgroundSlice';
import { BgType } from '../../types/bg.type';
import { WorkingSpaceType } from '../../types/workingSpace.type';
import Guest from './Guest';
import { Toaster, toast } from 'react-hot-toast';
import FormCreateBoard from '../project/FormCreateBoard';
import FormCreateMemberWs from '../project/FormCreateMemberWs';
import useCutomeHook from '../../redux/contants/useCutomeHook';

export default function ContentBoard() {
  const { userLogin } = useCutomeHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCreateBoard = useSelector(
    (state: RootState) => state.board
  ).board;

  useEffect(() => {
    dispatch(findAllWorkingSpace());
  }, []);

  const listWorkingSpace = useSelector((state: RootState) => {
    return state.workingSpace.listWorkingSpace;
  });

  useEffect(() => {
    dispatch(findAllBoard());
  }, []);

  const listBoard = useSelector((state: RootState) => state.board.listBoard);

  const handleClick = (
    board: BoardType,
    workingSpaceId: string,
    background: BgType
  ) => {
    navigate(`/project/${board.id}`, {
      state: {
        board: board,
        background: background,
        workingSpaceId: workingSpaceId,
      },
    });
  };

  const backgrounds = useSelector(
    (state: RootState) => state.backgrounds.backgrounds
  );

  useEffect(() => {
    dispatch(findAllBackground());
  }, []);

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

  const handleDeleteWs = (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(deleteWs(id));
    toast.success('Xóa thành công');
  };

  return (
    <div className="ms-5 w-100">
      <Toaster />
      <div className="content-ws">
        <h5 className="mt-5">Các không gian làm việc của bạn</h5>
        {listWorkingSpace &&
          listWorkingSpace.map((workingSpace, index) => {
            if (workingSpace.userId === userLogin?.id) {
              return (
                <div key={workingSpace.id} className="history mt-4 ">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div
                        className="charAt me-2"
                        style={{
                          backgroundColor: charColors[index],
                        }}
                      >
                        <p className="text-center text-white">
                          {workingSpace.name.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <p className="m-0 fs-5 font">{workingSpace.name}</p>
                    </div>

                    <div className="d-flex">
                      <button className="btn btn-light border rounded me-2 btn-ws">
                        <i className="bi bi-kanban me-2 fs-6"></i>Bảng
                      </button>
                      <button className="btn btn-light border rounded me-2 btn-ws">
                        <i className="bi bi-columns-gap me-2 fs-6"></i>Dạng xem
                      </button>
                      <FormCreateMemberWs workingSpaceId={workingSpace.id} />
                      <div className="dropdown">
                        <button
                          className="btn btn-light border rounded me-2 btn-ws"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-gear-wide me-2 fs-6"></i>Cài đặt
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
                              className=" border rounded btn btn-danger w-100"
                              onClick={(e) =>
                                handleDeleteWs(e, workingSpace.id)
                              }
                            >
                              Xóa
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap mt-3">
                    {listBoard &&
                      listBoard.map((board: BoardType) => {
                        if (board.workingSpaceId === workingSpace.id) {
                          return backgrounds.map((background) => {
                            if (background.id === board.backgroundId) {
                              return (
                                <div
                                  onClick={() =>
                                    handleClick(
                                      board,
                                      workingSpace.id,
                                      background
                                    )
                                  }
                                  key={board.id}
                                  className="card text-white me-2 mb-2 board "
                                  style={{
                                    backgroundImage: `url(${background.url})`,
                                  }}
                                >
                                  <div className="card-img-overlay">
                                    <h5 className="card-title">{board.name}</h5>
                                  </div>
                                </div>
                              );
                            }
                          });
                        }
                      })}
                    <React.Fragment>
                      <div className="dropdown">
                        <button
                          className="btn btn-light btn-create-board "
                          type="button"
                          data-bs-target={`dropdownMenuButton1_${workingSpace.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Tạo bảng mới
                        </button>
                        <FormCreateBoard
                          backgrounds={backgrounds}
                          workingSpace={workingSpace}
                        />
                      </div>
                    </React.Fragment>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <Guest />
    </div>
  );
}
