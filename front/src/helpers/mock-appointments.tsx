export type mockAppointments = {
  id: number;
  date: string;
  time: string;
  location: string;
  gameMode: string;
  userId: number;
  status: "active" | "cancelled";
};

export type displayedData = Omit<mockAppointments, "id" | "userId">;

const dataAppointments: mockAppointments[] = [
  {
    id: 1,
    date: "2024-04-26",
    time: "12:00 PM",
    location: "Uk",
    gameMode: "Koth",
    userId: 1,
    status: "active",
  },
  {
    id: 2,
    date: "2024-04-27",
    time: "1:00 PM",
    location: "Uk",
    gameMode: "Koth",
    userId: 2,
    status: "cancelled",
  },
  {
    id: 3,
    date: "2024-04-28",
    time: "2:00 PM",
    location: "Uk",
    gameMode: "Koth",
    userId: 3,
    status: "active",
  },
  {
    id: 4,
    date: "2024-04-29",
    time: "3:00 PM",
    location: "Uk",
    gameMode: "Koth",
    userId: 4,
    status: "cancelled",
  },
  {
    id: 5,
    date: "2024-04-30",
    time: "4:00 PM",
    location: "Uk",
    gameMode: "Koth",
    userId: 5,
    status: "active",
  },
];

export default dataAppointments;
