import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthSupport from './AuthSupport';
import { useDispatch } from 'react-redux';
import { createUser, register } from '../../redux/reducer/userSlice';
export default function SignUp() {
  const [email, setEmail] = useState({
    email: '',
  });

  const [password, setPassword] = useState({
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EMAIL_PATTERN = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const PASS_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const [resultEmail, setResultEmail] = useState('');
  const [resultPass, setResultPass] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setEmail({ ...email, [name]: value });
  };

  useEffect(() => {
    if (email.email != '') {
      if (!EMAIL_PATTERN.test(email.email)) {
        setResultEmail('Email không đúng định dạng!');
      } else {
        setResultEmail('');
      }
    }
    if (password.password != '') {
      if (!PASS_PATTERN.test(password.password)) {
        setResultPass('Mật khẩu phải ít nhất 8 kí tự bao gồm kí tự hoa và số!');
      } else {
        setResultPass('');
      }
    }
  }, [email.email, password.password]);

  const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setPassword({ ...password, [name]: value });
  };

  const handleCreateUser = () => {
    dispatch(
      createUser({
        type: 'nomarl',
        user: {
          email: email.email,
          password: password.password,
          googleId: '',
          imageUrl:
            'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=XGc5nFwI_4gAX_6ABBQ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAxT4lPSLzx0x6EiWlscsW7y4TN0_PtPIBWLItFmwFpOQ&oe=64E68E78',
          name: '',
          emagivenNamel: '',
          familyName: '',
        },
      })
    );
    navigate('/signIn');
  };

  const changeButton = () => {
    if (EMAIL_PATTERN.test(email.email)) {
      if (PASS_PATTERN.test(password.password)) {
        return (
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleCreateUser}
          >
            Tiếp tục
          </button>
        );
      }
    }
    return (
      <button disabled type="button" className="btn btn-secondary w-100">
        Tiếp tục
      </button>
    );
  };
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
                  <h5 className="mb-5 mt-5">Đăng kí tài khoản</h5>
                  <div className="form-outline mb-4">
                    <input
                      name="email"
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg mb-2"
                      placeholder="Nhập Email"
                      value={email.email}
                      onChange={handleChange}
                    />
                    <p className="result mt-2">{resultEmail}</p>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Nhập password"
                      value={password.password}
                      onChange={handleChangePass}
                    />
                    <p className="result mt-2">{resultPass}</p>
                    <label
                      className="form-label mt-4"
                      htmlFor="typeEmailX-2"
                      style={{ fontSize: 14 }}
                    >
                      Bằng việc nhấp vào “Tiếp tục” bên dưới, bạn đồng ý với{' '}
                      <a href="">Điều khoản dịch vụ Atlassian Cloud</a> của
                      Atlassian và chấp nhận <a href="">Chính sách bảo mật.</a>
                    </label>
                  </div>

                  {/* Checkbox */}
                  {changeButton()}
                  <p className="mt-4 mb-4">Hoặc</p>
                  <AuthSupport />
                  <hr className="my-4"></hr>
                  <NavLink to={'/signIn'}>
                    Bạn đã có tài khoản? Đăng nhập
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
