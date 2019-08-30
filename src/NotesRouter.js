const express = require('express');
const xss = require('xss');

const NotesService = require('./NotesService');

const bodyParser = express.json();
const NotesRouter = express.Router();

NotesRouter.route('/')
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get('db'))
      .then(response => {
        res.json(response)
      })
      .catch(next)
  })

  NotesRouter.route('/list/:id')
    .get((req, res, next) => {
      id = req.params.id;
      NotesService.getNotesByList(req.app.get('db'), id)
        .then(response => {
          res.json(response)
        })
        .catch(next)
    })

  module.exports=NotesRouter