import React from 'react';

export default function SideBarRight() {
  return (
    <div className="ms-5 mt-5">
      <h6>Đã xem gần đây</h6>
      <button className="history d-flex align-items-center btn btn-light">
        <img
          className="img-table border"
          src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/6ffa604bbf915842e02da30bbd2ad964/photo-1688232542797-c3e762c7e3c3.jpg"
          alt=""
        />
        <div className="ms-2 history-text">
          <p className="history-title text-start">Bảng</p>
          <p className="history-name">không gian làm việc của Thái Nam</p>
        </div>
      </button>
      <h6 className="mt-3">Liên kết</h6>
      <button className="btn btn-light mb-3 btn-add-table">
        <div className="d-flex align-items-center">
          <i className="bi bi-plus-square fs-3"></i>
          <p className="ms-3">Tạo Bảng</p>
        </div>
      </button>
    </div>
  );
}
