import { NavLink, useNavigate } from 'react-router-dom';
import useCutomeHook from '../../redux/contants/useCutomeHook';

export default function () {
  const navigate = useNavigate();
  const { userLogin } = useCutomeHook();

  const handleSignOut = () => {
    localStorage.removeItem('userLogin');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg navbar-home">
        <div className="container-fluid">
          <i className="bi bi-trello"></i>
          <NavLink className="navbar-brand ms-2" to={'/home/contentBoard'}>
            Trello
          </NavLink>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item dropdown ">
                <a
                  className="nav-link fs-6"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Các không gian làm việc
                  <i className="bi bi-chevron-down ms-1 fs-6"></i>
                </a>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link fs-6"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gần đây
                  <i className="bi bi-chevron-down ms-1 fs-6"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link fs-6"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Đã đánh dấu sao
                  <i className="bi bi-chevron-down ms-1 fs-6"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link fs-6"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mẫu
                  <i className="bi bi-chevron-down ms-1 fs-6"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex align-items-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="notification">
                <i className="bi bi-bell ms-2 fs-5"></i>
              </div>
              <div className="question">
                <i className="bi bi-question-circle ms-2 fs-5"></i>
              </div>
              <div className="themes">
                <i className="bi bi-circle-half ms-2 fs-5"></i>
              </div>
              <div>
                {userLogin ? (
                  <div className="dropdown">
                    <img
                      src={userLogin.imageUrl}
                      className="border rounded-circle ms-2 fs-5 profile-img"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu profile-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          {userLogin.name}
                        </a>
                      </li>
                      <hr className="my-2" />
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="dropdown-item btn btn-light"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
