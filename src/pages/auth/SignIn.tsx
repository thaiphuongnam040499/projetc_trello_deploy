import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthSupport from './AuthSupport';
import { useDispatch } from 'react-redux';
import {
  findAllUser,
  findUserByEmail,
  getUserByEmail,
  getUserLogin,
  login,
} from '../../redux/reducer/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const users = useSelector((state: RootState) => state.user.listUser);
  const [result, setResult] = useState('');

  useEffect(() => {
    dispatch(findAllUser());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    if (user.email != '' && user.password != '') {
      for (let i = 0; i < users.length; i++) {
        if (user.email === users[i].email) {
          dispatch(login({ email: user.email, password: user.password }));
          setTimeout(() => {
            dispatch(getUserLogin(null));
          }, 1000);
          return;
        } else {
          setResult('Tài khoản hoặc mật khẩu không chính xác');
        }
      }
    } else {
      setResult('Không được để trống');
    }
  };

  useEffect(() => {
    if (userLogin) localStorage.setItem('userLogin', JSON.stringify(userLogin));
  }, [userLogin]);

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#fffff' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow shadow-2-strong"
                style={{ borderRadius: '1rem' }}
              >
                <div className="card-body p-5 text-center">
                  <img
                    src="https://images.ctfassets.net/rz1oowkt5gyp/13zrkgNeK4xNziAQIfM3BT/44c6750e80104e3a38a61881c21a0923/trello-logo-blue.svg"
                    alt=""
                  />
                  <h5 className="mb-5 mt-5">Đăng nhập vào trello</h5>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg mb-3"
                      placeholder="Nhập email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Nhập password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                    <p className="result mt-2">{result}</p>
                  </div>

                  {/* Checkbox */}
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={handleSignIn}
                  >
                    Tiếp tục
                  </button>
                  <p className="mt-4 mb-4">Hoặc</p>
                  <AuthSupport />
                  <hr className="my-4"></hr>
                  <div>
                    <a href="">Không thể đăng nhập?</a>
                    <span>.</span>
                    <NavLink to={'/signUp'}>Đăng kí tài khoản</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
