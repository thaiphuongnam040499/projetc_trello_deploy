import { url } from 'inspector';
import React from 'react';

export default function ContentTrello() {
  return (
    <div className="">
      <div className="header d-flex row p-5">
        <div className="col-6">
          <h1>
            Trello tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn
            lại với nhau
          </h1>
          <p className="mb-3 mt-3">
            Duy trì mọi thứ ở cùng một nơi - dù cho nhóm của bạn không ở cùng
            nhau.
          </p>
          <input
            type="text"
            className="form-control mb-3 w-50"
            placeholder="Email"
          ></input>
          <button type="button" className="btn btn-primary">
            Đăng ký - hoàn toàn miễn phí!
          </button>
        </div>
        <div className="col-6">
          <img
            className="w-100 h-100"
            src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp"
            alt=""
          />
        </div>
      </div>
      <div className="information container mt-5">
        <div className="information_basic text-start w-50">
          <h5>Thông tin cơ bản về trello</h5>
          <h3>Đỉnh cao về năng suất</h3>
          <p>
            Đơn giản, linh hoạt và mạnh mẽ. Chỉ với bảng, danh sách và thẻ, bạn
            sẽ biết rõ ai đang làm gì và những việc cần làm. Tìm hiểu thêm trong
            hướng dẫn bắt đầu của chúng tôi.
          </p>
        </div>
        <div className="information_item d-flex">
          <ul className="w-50">
            <li className="mb-4 mt-5">
              <h6>Các Bảng</h6>
              <p>
                Bảng Trello giúp bạn sắp xếp hợp lý các nhiệm vụ và thúc đẩy
                công việc. Bạn có thể xem mọi thông tin, từ việc cần làm đến
                việc đã hoàn thành, chỉ trong nháy mắt.
              </p>
            </li>
            <li className="mb-4 mt-5">
              <h6>Danh Sách</h6>
              <p>
                Các giai đoạn khác nhau của một nhiệm vụ. Hãy bắt đầu thật đơn
                giản với Việc cần làm, Việc đang làm hoặc Việc đã xong - hoặc
                xây dựng một quy trình làm việc tùy chỉnh theo đúng nhu cầu của
                nhóm bạn. Với Trello, cách nào cũng phát huy hiệu quả.
              </p>
            </li>
            <li className="mb-4 mt-5">
              <h6>Thẻ</h6>
              <p>
                Thẻ trình bày các nhiệm vụ và ý tưởng, đồng thời lưu giữ mọi
                thông tin giúp hoàn thành công việc. Trong quá trình thực hiện
                nhiệm vụ, bạn có thể di chuyển thẻ qua các danh sách để thể hiện
                trạng thái của thẻ.
              </p>
            </li>
          </ul>
          <div>
            <img
              className="w-75 h-75 ms-5 mt-5"
              src="https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
