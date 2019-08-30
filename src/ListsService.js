const ListsService = {

  getLists(db) {
    return db
      .select('*')
      .from('lists')
  },

  getList(db, listId) {
    return db
      .select('*')
      .from('lists')
      .where({id: listId})
  },

  deleteList(db, listId) {
    return db
      .delete()
      .from('lists')
      .where({id: listId})
      .returning('*')
  },

  updateList(db, newData, listId) {
    return db
      .update(newData)
      .from('lists')
      .where({id: listId})
      .returning('*')
  }

}

module.exports = ListsService;