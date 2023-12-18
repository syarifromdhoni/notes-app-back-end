const { nanoid } = require("nanoid");
const notes = require("./notes");

// untuk mengirim catatan
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(15);
  const createdAt = new Date().toLocaleString();
  const updatedAt = createdAt;

  // masukan nilai-nilai diatas ke dalam array notes
  //menggunakan method push()
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  // untuk menentukan apakah newNote sudah masuk ke dalam array notes
  // kita gunakan method filter() berdasarkan id catatan

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  //kita gunakan isSuccess untuk menentukan respons yang diberikan server
  //Jika isSuccess bernilai true, maka beri response berhasil. Jika false, maka beri response gagal.

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambah",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

// untuk menampilkan catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// untuk menampilkan detail catatan
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// untuk mengedit catatan
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toLocaleString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui catatan, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// untuk menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
