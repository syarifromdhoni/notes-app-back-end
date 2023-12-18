const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  // untuk mengirim catatan
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },

  // untuk menampilkan catatan
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },

  // untuk melihat detail catatan
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },

  // untuk mengedit catatan
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },

  // untuk menghapus catatan
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
