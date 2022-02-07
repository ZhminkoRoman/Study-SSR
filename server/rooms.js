const rooms = [];

const addRoom = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // const existingUser = rooms.find(r => user.room === room && user.name === name);

  // if (!name || !room) return { error: 'Username and room are required.' };
  // if (existingUser) return { error: 'Username already exists.' };

  const chatRoom = { id, name, room };

  rooms.push(chatRoom);

  return { chatRoom };
};

const deleteRoom = id => {
  const index = roomss.findIndex(room => room.room === room);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getRoom = room => rooms.find(room => room.room === room);

const getRooms = () => rooms;

module.exports = { addRoom, deleteRoom, getRoom, getRooms };