import React, { useState, useEffect } from 'react';
import { WorkingSpaceType } from '../../types/workingSpace.type';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { BgType } from '../../types/bg.type';
import { BoardType } from '../../types/board.type';
import { findAllBoard } from '../../redux/reducer/boardSlice';
import { findAllWorkingSpace } from '../../redux/reducer/workingSpaceSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findAllBackground } from '../../redux/reducer/backgroundSlice';
import { findAllMemberWs } from '../../redux/reducer/memberWsSlice';
import { findAllMember } from '../../redux/reducer/memberSlice';
import useCutomeHook from '../../redux/contants/useCutomeHook';
import FormCreateBoard from './FormCreateBoard';

export default function Table() {
  const dispatch = useDispatch();
  const { userLogin } = useCutomeHook();
  const navigate = useNavigate();
  const members = useSelector((state: RootState) => state.memberWs.memberWs);
  const member = members.find((member) => member.email === userLogin?.email);
  const memberBoards = useSelector((state: RootState) => state.members.members);
  const memberBoard = memberBoards.find(
    (memberBoard) => memberBoard.email === userLogin?.email
  );
  const location = useLocation();
  const backgrounds = useSelector(
    (state: RootState) => state.backgrounds.backgrounds
  );

  useEffect(() => {
    dispatch(findAllWorkingSpace());
    dispatch(findAllMemberWs());
    dispatch(findAllMember());
    dispatch(findAllBackground());
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

  return (
    <div className="ms-5 w-100">
      {listWorkingSpace &&
        listWorkingSpace.map((workingSpace, index) => {
          if (workingSpace.id === location.state.workingSpaceId) {
            return (
              <div className="">
                {/* <h5 className="mt-3">{workingSpace.name}</h5> */}
                <div key={workingSpace.id} className="history mt-4 mb-5">
                  <div className="d-flex align-items-center justify-content-center">
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
                      <p className="m-0 fs-3 font">{workingSpace.name}</p>
                    </div>
                  </div>

                  <hr className="my-4 mt-5 mb-5" />
                  <div className="mt-5 mb-5">
                    <h5>Bảng</h5>
                  </div>

                  <div className="d-flex flex-wrap mt-3">
                    {listBoard &&
                      listBoard.map((board: BoardType) => {
                        if (board.workingSpaceId === workingSpace.id) {
                          return backgrounds.map((background) => {
                            if (background.id === board.backgroundId) {
                              return (
                                <div>
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
                                      <h5 className="card-title">
                                        {board.name}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          });
                        }
                      })}
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
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
