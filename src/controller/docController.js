//import Table from '../models/models.js'
//import sequelize from "sequelize"
//import {Op} from 'sequelize'

const Table = require('../models/models')
const sequelize = require('sequelize')
const {Op} = require('sequelize')


class UserController {
// 13:36
//http://localhost:8080/api/doc POST
	async createDoc(req, res) {
 
		try {
			const {name, comment, userId,statusDocumentId, totalPrice} = req.body
			//console.log(name, comment, userId,statusDocumentId)
			const doc = await Table.Document_order.create(
				{name, 
				comment,
				userId,//new Date(),
				statusDocumentId,
				totalPrice,
				}
				)
			return res.json(doc)
		} catch (e) {
			return res.json(e)
		}		
	}
	
//GET http://localhost:8080/api/doc?limit=3&page=1	
// для front-end - {"count": 10,"rows": [{....},{....}]} count - для отображения кнопок
// router.get('/', authMiddleware,  userController.getAllDocs)
// Вставить токен в заголовок.
	async getAllDocs(req, res) {
		try {	
		console.log("++++++++++++ ", id)
			let {limit, page} = req.query	
			limit = limit || 5 // На каждой странице
			page = page || 1
			let offset = page * limit - limit
			let docs;	
			//findAll({ limit: 10, order: [['updatedAt', 'DESC']]}) //'ASC'
			//Новые (изменённые) документы первые
			docs = await Table.Document_order.findAndCountAll({
				limit, offset, order: [['updatedAt', 'DESC']],
				include: [{
					//required: true,
					//where: {id: 1},
					attributes: ['id','name', 'email',],
					association: "User"
					}]
			})
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}
	
	// ++GET http://localhost:8080/api/doc/1
		async getAllDocsUserId(req, res) {
			try {	
				const {id} = req.params
				//console.log("-----------", id)
				let docs;	
				docs = await Table.Document_order.findAll({
					//limit, offset, order: [['updatedAt', 'DESC']],
					where: {userId: id},
					//include: [{
						//required: true,
						//where: {id: 1},
						//attributes: ['id','name', 'email',],
						//association: "SalesTable"
						//}]
				})
				return res.json(docs)
			} catch (e) {
				return res.json(e)
			}
	}
	
	
	
// 1C -----------------------
// GET http://localhost:8080/api/doc/filter/10
		async getAllDocsFilterId(req, res) {
			try {	
				const {id} = req.params
				//let docs;	
				const docs = await Table.Document_order.findAll({
					//limit, offset, order: [['updatedAt', 'DESC']],
					where: {id: {[Op.gt]: id}},  // > 6
					//----[Op.between]: [8, 10],    // BETWEEN 8 AND 10
					//attributes: ['id','name', 'comment','totalPrice', 'userId', 'statusDocumentId','createdAt',]
					attributes: ['id',]
					//include: [{
						//required: true,
						//where: {id: 1},
						//attributes: ['id','name', 'email',],
						//association: "SalesTable"
						//}]
				})
				return res.json(docs)
			} catch (e) {
				return res.json(e)
			}
	}
//   -----------------------
	
	
	
	
//GET http://localhost:8080/api/doc/1
	async getOneDoc(req, res) {
		
		try {
			const {id} = req.params
			console.log("id= ", id)
			const docs = await Table.Document_order.findOne( 
			{
             where: {id},
			include: [{
				//required: true,
				//where: {id: 1},
				attributes: ['id','name', 'email',],
				association: "User"
				}]
			},
			
			)
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}



/*
Table.Document_order.findAll({
  attributes: {
    include: [
      [
        sequelize.literal(`(
          SELECT *
          FROM kontragents AS kontragents
          WHERE
            kontragents.id = 1
        )`),
        'name',
      ],
    ],
  },
  order: [
    [sequelize.literal('laughReactionsCount'), 'DESC']
  ],
})
*/


//Сделеать все поля или удалять все данные и записывать новые 	
//PUT //http://localhost:8080/api/doc/2	
//await User.upsert({ id: 3, lastName: "Doe", });
	async updateDoc(req, res) {
		try {	
		const {id} = req.params
		const {name, comment,statusDocumentId,  kontragentId,userId} = req.body
		//console.log("req.body", req.body)
		//console.log("id", id)
		const docs = await Table.Document_order.update(			
			//{kontragentId: 7,},
				{name,  comment,statusDocumentId,  kontragentId,userId},//comment,statusDocumentId,  kontragentId,userId
				{where: { id: id },},

		)
		return res.json(docs)
	} catch (e) {
		return res.json(e)
	}
	}
	
	
	
	
// DELETE //http://localhost:8080/api/doc/2		
	async deleteDoc(req, res) {
		try {
			const {id} = req.params
			//console.log("id= ", id)
			const docs = await Table.Document_order.destroy(
			{
                where: {id},
            },
			)
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}
	}



module.exports = new UserController()
