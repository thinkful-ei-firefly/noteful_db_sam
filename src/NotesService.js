const NotesService = {

  getAllNotes(db) {
    return db
      .select('*')
      .from('notes')
  },

  getNotesByList(db, listId) {
    return db
      .select('*')
      .from('notes')
      .where({list_id: listId})
  },

  addNote(db, newNote) {
    return db
      .insert(newNote)
      .into('notes')
      .returning('*')
  },

  deleteNote(db, noteId) {
    return db
      .delete()
      .from('notes')
      .where({id: noteId})
      .returning('*')
  },

  updateNote(db, newData, noteId) {
    return db
      .update(newData)
      .from('notes')
      .where({id: noteId})
      .returning('*')
  }

}

module.exports = NotesService