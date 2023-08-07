import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { findAllBoard } from '../../redux/reducer/boardSlice';
import { findAllLane } from '../../redux/reducer/laneSlice';
import { findAllCard } from '../../redux/reducer/cardSlice';
import { useLocation } from 'react-router-dom';
import { findAllListTask } from '../../redux/reducer/listTaskSlice';
import { findAllTask } from '../../redux/reducer/taskSlice';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const initialState = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: '# of Votes',
      data: [15, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Phân công công việc',
      data: [15, 19, 3, 5, 2, 100, 14],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function Chart() {
  const lanes = useSelector((state: RootState) => state.lanes.lanes);
  const cards = useSelector((state: RootState) => state.card.listCard);
  const boards = useSelector((state: RootState) => state.board.listBoard);
  const listTasks = useSelector((state: RootState) => state.listTask.listTask);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [data, setData] = useState(initialState);
  const [dataBar, setDataBar] = useState(data1);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(findAllBoard());
    dispatch(findAllLane());
    dispatch(findAllCard());
    dispatch(findAllListTask());
    dispatch(findAllTask());
  }, []);

  useEffect(() => {
    let laneFilter = lanes.filter(
      (lane) => lane.boardId === location.state.board.id
    );
    let laneName = [];
    for (let i = 0; i < laneFilter.length; i++) {
      laneName.push(laneFilter[i].title);
    }
    let counts = [];
    for (let i = 0; i < laneFilter.length; i++) {
      let card = cards.filter((card) => card.laneId === laneFilter[i].id);
      counts.push(card.length);
    }

    setData({
      ...data,
      labels: laneName,
      datasets: [{ ...initialState.datasets[0], data: counts }],
    });
  }, []);

  const handleSelectBoard = (boardId: string) => {
    let laneFilter = lanes.filter((lane) => lane.boardId === boardId);
    let laneName = [];
    for (let i = 0; i < laneFilter.length; i++) {
      laneName.push(laneFilter[i].title);
    }
    let counts = [];
    for (let i = 0; i < laneFilter.length; i++) {
      let card = cards.filter((card) => card.laneId === laneFilter[i].id);
      counts.push(card.length);
    }

    setData({
      ...data,
      labels: laneName,
      datasets: [{ ...initialState.datasets[0], data: counts }],
    });
  };

  useEffect(() => {
    let lane = lanes.find((lane) => lane.boardId === location.state.board.id);
    let card = cards.find((card) => card.laneId === lane?.id);
    console.log(card);

    const listTaskFilter = listTasks.filter(
      (listTask) => listTask.cardId === card?.id
    );
    console.log(listTaskFilter);

    let completes = [];
    let listTaskNames = [];
    for (let i = 0; i < listTaskFilter.length; i++) {
      completes.push(listTaskFilter[i].complete);
      listTaskNames.push(listTaskFilter[i].name);
    }
    console.log(completes);
    console.log(listTaskNames);

    setDataBar({
      ...dataBar,
      labels: listTaskNames,
      datasets: [{ ...data1.datasets[0], data: completes }],
    });
  }, []);

  const handleSelectLane = (laneId: string) => {
    let card = cards.find((card) => card.laneId === laneId);
    console.log(card);

    const listTaskFilter = listTasks.filter(
      (listTask) => listTask.cardId === card?.id
    );
    console.log(listTaskFilter);

    let completes = [];
    let listTaskNames = [];
    for (let i = 0; i < listTaskFilter.length; i++) {
      completes.push(listTaskFilter[i].complete);
      listTaskNames.push(listTaskFilter[i].name);
    }
    console.log(completes);
    console.log(listTaskNames);

    setDataBar({
      ...dataBar,
      labels: listTaskNames,
      datasets: [{ ...data1.datasets[0], data: completes }],
    });
  };

  return (
    <div className="m-auto">
      <div className="d-flex">
        <div className="mb-5 me-2">
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Chọn bảng
            </button>
            <ul
              className="dropdown-menu p-2"
              aria-labelledby="dropdownMenuButton1"
            >
              {boards.map((board) => {
                if (board.workingSpaceId === location.state.workingSpaceId) {
                  return (
                    <li>
                      <button
                        onClick={() => handleSelectBoard(board.id)}
                        className="btn btn-light w-100 mb-2 border rounded "
                      >
                        {board.name}
                      </button>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div className="mb-5">
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Chọn Lane
            </button>
            <ul
              className="dropdown-menu p-2"
              aria-labelledby="dropdownMenuButton1"
            >
              {lanes.map((lane) => {
                if (lane.boardId === location.state.board.id) {
                  return (
                    <li>
                      <button
                        onClick={() => handleSelectLane(lane.id)}
                        className="btn btn-light w-100 mb-2 border rounded "
                      >
                        {lane.title}
                      </button>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Pie className="chart me-5" data={data} />
        <Bar className="chart" options={options} data={dataBar} />
      </div>
      <div className="mt-5">
        <h5 className="text-center">Thống kê bảng</h5>
      </div>
    </div>
  );
}
