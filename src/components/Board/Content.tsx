import React from 'react';
import SideBarRight from './SideBarRight';

export default function Content() {
  return (
    <div className="d-flex">
      <div className="card mt-5 ms-5 border rounded content">
        <img
          src="https://trello.com/assets/e55b3540e5c1f06a51d7.svg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body text-center">
          <h5 className="card-title">Theo dõi và cập nhật</h5>
          <p className="card-text">
            Mời mọi người vào bảng và thẻ, để lại nhận xét, thêm ngày hết hạn và
            chúng tôi sẽ hiển thị hoạt động quan trọng nhất ở đây.
          </p>
        </div>
      </div>
      <SideBarRight></SideBarRight>
    </div>
  );
}
