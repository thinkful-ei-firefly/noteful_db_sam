const express = require('express');
const xss = require('xss');

const NotesService = require('./NotesService');

const bodyParser = express.json();
const NotesRouter = express.Router();

NotesRouter.route('/all/notes')
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get('db'))
      .then(response => {
        res.json(response)
      })
      .catch(next)
  })
  

  NotesRouter.route('/:listId/notes')
    .get((req, res, next) => {
      id = req.params.listId;
      NotesService.getNotesByList(req.app.get('db'), id)
        .then(response => {
          res.json(response)
        })
        .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
      const { note_name, content } = req.body
  
      if (!note_name.length || !content.length) {
        return res.status(400).send('must provide note with a name and some content ')
      }

      const list_id = req.params.listId
      const date = new Date()
      
      const newNote = {
        note_name: xss(note_name),
        content: xss(content),
        modified: date.toISOString(),
        list_id
      }

      NotesService.addNote(req.app.get('db'), newNote)
        .then(response => {
          res.json(response)
        })
        .catch(next)
    })

    NotesRouter.route('/:listId/note/:noteId')
    .get((req, res, next) => {
      const { noteId } = req.params
      NotesService.getNote(req.app.get('db'), noteId)
        .then(response => {
          if (!response.length) {
            return res.status(404).send('Could not find note with that id')
          }
          res.json(response)
        })
        .catch(next)
    })
    .delete((req, res, next) => {
      const noteId = req.params.noteId
      NotesService.deleteNote(req.app.get('db'), noteId)
        .then(response => {
          if (!response.length) {
            return res.status(404).send('Could not find note to delete')
          }
          res.json(response)
        })
        .catch(next)
    })
    .patch(bodyParser, (req, res, next) => {
      const { noteId } = req.params;
      const { note_name, content, list_id } = req.body;
      if (!note_name || !content) {
        return res.status(400).send('Must modify at least one of name or content')
      }
      const date = new Date();
      const updatedNote= {
        modified: date.toISOString()
      }

      if (note_name) updatedNote.note_name = xss(note_name);
      if (content) updatedNote.content = xss(content);
      if (list_id) updatedNote.list_id = list_id

      console.log(updatedNote);
      console.log('note id is '+noteId);

      NotesService.updateNote(req.app.get('db'), updatedNote, noteId)
        .then(response => {
          res.json(response)
        })
        .catch(next)
    })

  module.exports=NotesRouter