import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { findUserByEmail } from '../../redux/reducer/userSlice';
import { MemberType } from '../../types/member.type';
import { Role } from '../../enums/Role';
import { User } from '../../types/user.type';
import {
  createMember,
  findAllMember,
  updateMember,
} from '../../redux/reducer/memberSlice';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Filter from './Filter';
import { useLocation, useNavigate } from 'react-router-dom';
import useCutomeHook from '../../redux/contants/useCutomeHook';
import Loading from '../homeTrello/Loading';
import { ScaleLoader } from 'react-spinners';

interface HeaderProjectProps {
  workingSpaceId: string;
  boardId: string;
  setTypeView: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: MemberType = {
  name: '',
  email: '',
  imageUrl: '',
  boardId: '',
  cardId: '',
  role: Role.MEMBER,
};

const roles = [Role.ADMIN, Role.MEMBER, Role.OBSERVER];

export default function HeaderProject({
  workingSpaceId,
  boardId,
  setTypeView,
}: HeaderProjectProps) {
  const listUser = useSelector((state: RootState) => state.user.listUser);
  const [userSearch, setUserSearch] = useState('');
  const [member, setMember] = useState<MemberType>(initialState);
  const listMember = useSelector((state: RootState) => state.members.members);

  const [members, setMembers] = useState<MemberType[]>([]);
  const boards = useSelector((state: RootState) => state.board.listBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { userLogin } = useCutomeHook();

  useEffect(() => {
    dispatch(findUserByEmail(userSearch));
  }, [userSearch]);

  useEffect(() => {
    dispatch(findAllMember());
  }, []);

  const handleAddMember = (user: User) => {
    if (!checkExits(user, members)) {
      setMembers([
        ...members,
        {
          name: user.name,
          email: user.email,
          imageUrl: user.imageUrl,
          boardId: boardId,
          role: member.role,
        },
      ]);
    }
  };

  const checkExits = (user: User, members: MemberType[]) => {
    return members.find((item) => item.email === user.email);
  };

  const handleCreateMember = () => {
    if (members.length != 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const isExits = members.find((item) => item.email === member.email);
        if (isExits) {
          toast.error('Bạn đã thêm người này!!!');
          return;
        } else {
          for (let i = 0; i < members.length; i++) {
            dispatch(createMember(members[i]));
            toast.success('thêm mới thành công');
            setUserSearch('');
            setMembers([]);
          }
        }
      }, 2000);
    } else {
      toast.error('Hãy chọn thành viên muốn thêm');
    }
  };

  const handleShowTag = members.map((user, index) => {
    return (
      <div className="me-2 force-overflow">
        <Toaster />
        <span className="d-flex align-items-center ">
          <span>{user.email}</span>
          <button
            className="bi bi-x btn btn-light "
            onClick={() => {
              let arr = [...members];
              arr.splice(index, 1);
              setMembers(arr);
            }}
          ></button>
        </span>
      </div>
    );
  });

  const changeUpdate = (
    e: React.ChangeEvent<HTMLSelectElement>,
    member: MemberType
  ) => {
    let changeRole = e.target.value;
    dispatch(
      updateMember({
        ...member,
        role: changeRole,
      })
    );
    toast.success('Thay đổi trạng thái thành công');
  };

  const handleClick = () => {
    setTypeView((pre) => !pre);

    // navigate('/table', {
    //   state: {
    //     workingSpaceId: location.state.workingSpaceId,
    //     boardId: location.state.board.id,

    //   },
    // });
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom header-project border-start">
        <div className="container-fluid">
          {boards.map((board) => {
            if (board.id === boardId) {
              return (
                <a key={board.id} className="navbar-brand ms-2" href="#">
                  {board.name}
                </a>
              );
            }
          })}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 "></ul>
            <div className="d-flex">
              <div className="me-2">
                <li className="mb-1">
                  <button
                    className="btn btn-light w-100 text-start sidebar-btn align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#home-collapse"
                    aria-expanded="false"
                    onClick={handleClick}
                  >
                    <i className="bi bi-table px-2"></i>
                    Bảng
                  </button>
                </li>
              </div>
              <Filter listMember={listMember} boardId={boardId} />
              <div className="d-flex align-items-center me-3">
                {listMember.map((member) => {
                  if (member.boardId === boardId) {
                    return (
                      <div key={member.id}>
                        <img
                          src={member.imageUrl}
                          alt=""
                          className="member-input"
                        />
                      </div>
                    );
                  }
                })}
              </div>

              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-light border rounded"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-person-add me-2"></i>
                Chia sẻ
              </button>
            </div>
            <div />
          </div>
        </div>
      </nav>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content modal-share">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Chia sẻ bảng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mt-2 mb-4">
                <div className="w-50 p-3 border search-user d-flex scrollbar scrollbar-indigo bordered-indigo thin">
                  <div className="force-overflow">
                    {handleShowTag}
                    <input
                      type="text"
                      placeholder="Địa chỉ email hoặc tên"
                      className="border rounded "
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                </div>

                {userSearch ? (
                  <div className="show-user-search border rounded pb-2">
                    {listUser.map((user) => {
                      return (
                        <button
                          key={user.googleId}
                          className="d-flex align-items-center btn btn-light w-100"
                          onClick={() => handleAddMember(user)}
                        >
                          <img
                            src={user.imageUrl}
                            alt=""
                            className="member-input me-2"
                          />
                          <div className="user-email-search">
                            <p className="fs-6 ">{user.email}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  ''
                )}
                <select
                  className="form-select ms-2 me-2"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setMember((prev) => ({
                      ...prev,
                      role: e.target.value as Role,
                    }))
                  }
                >
                  <option selected value={Role.MEMBER}>
                    Thành viên
                  </option>
                  <option value={Role.OBSERVER}>Quan sát viên</option>
                </select>
                <button
                  onClick={handleCreateMember}
                  className="btn btn-primary w-25"
                >
                  {loading ? (
                    <div className="create-member-loading">
                      <ScaleLoader className="scale-loader" loading={loading} />
                    </div>
                  ) : (
                    'Chia sẻ'
                  )}
                </button>
              </div>
              {listMember.map((member) => {
                if (member.boardId === boardId) {
                  return (
                    <div
                      key={member.id}
                      className="d-flex justify-content-between mb-3"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={member.imageUrl}
                          alt=""
                          className="member-input me-2"
                        />
                        <div>
                          <p className="fs-6">{member.name}</p>
                          <p className="fs-6">{member.email}</p>
                        </div>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => changeUpdate(e, member)}
                      >
                        {roles.map((role) => {
                          return (
                            <option
                              key={role}
                              selected={member.role === role ? true : false}
                              value={role}
                            >
                              {role}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
              })}
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
