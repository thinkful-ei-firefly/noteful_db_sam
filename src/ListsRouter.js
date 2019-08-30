const express = require('express');
const bodyParser = express.json();
const xss = require('xss');

const ListsService = require('./ListsService')

const ListsRouter = express.Router();



ListsRouter.route('/')
  .get((req, res, next) => {
    ListsService.getLists(req.app.get('db'))
      .then(listsData => {
        return res.json(listsData)
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    const { list_name }= req.body

    if (!list_name) {
      return res
        .status(400)
        .send('You must provide a name for your list')
    }

    const newList = {list_name: xss(list_name)}

    ListsService.addList(req.app.get('db'), newList)
      .then(response => {
        return res
          .status(201)
          .json(response)
      })
  })

  ListsRouter.route('/:id')
    .get((req, res, next) => {
      id=req.params.id
      ListsService.getList(req.app.get('db'), id)
        .then(response => {
          return res.json(response)
        })
    })

    .delete((req, res, next) => {
      id=req.params.id
      ListsService.deleteList(req.app.get('db'), id)
        .then(response => {
          res.json(response)
        })
        .catch(next)
    })

    .patch(bodyParser, (req, res, next) => {
      id=req.params.id
      const { list_name } = req.body
      if (!list_name) {
        return res.status(400).send('must provide a list name')
      }
      const newList = {list_name: xss(list_name)}
      ListsService.updateList(req.app.get('db'), newList, id)
        .then(response => {
          res.json(response)
        })
    })

  module.exports=ListsRouter;