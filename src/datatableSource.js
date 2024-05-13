export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active",
    email: "1jeff@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jeff Morris",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "2jeff@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Morris",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "3jeff@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "4jeff@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "5jeff@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "6jeff@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Morris",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "7jeff@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "8jeff@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Morris",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "jeff@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Jeff",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "Jeff@gmail.com",
    status: "active",
    age: 65,
  },
];
