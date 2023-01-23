//import Table from '../models/models.js'
//import {Op} from 'sequelize'


const Table = require('../models/models')
const {Op} = require('sequelize')

class PageHeadController {
// 13:36
//POST http://localhost:8080/api/pagehead
    async createPageHead(req, res) {
 
		try {
			
			const {name} = req.body
			const pagehead = await Table.Pagehead.create({name, 
                attributes: ['id', 'name']})
			return res.json(pagehead)
		} catch (e) {
			return res.json(e)
		}		
	}

    
// get http://localhost:8080/api/pagehead 
    async getAllPageHeads(req, res) {
        try {		
			//let {limit, page} = req.query	
			//limit = limit || 5 // На каждой странице
			//page = page || 1
			//let offset = page * limit - limit
			let pagehead;	
			pagehead = await Table.Pagehead.findAndCountAll(
			//{limit, offset, attributes: ['id','name'], 
			{ attributes: ['id','name'],
            order: [['updatedAt', 'ASC']]})
       		return res.json(pagehead)
		} catch (e) {
			return res.json(e)
		}

    }

// GET http://localhost:8080/api/pagehead/1	    
    async getOnePageHead(req, res) {
        try {
			const {id} = req.params
			const pagehead = await Table.Pagehead.findOne(
				{ where: {id}, },
			)
			if(pagehead){
       			return res.json(pagehead)
			} else {
				return res.json({message: "Страница не найдена с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}     

    }

//http://localhost:8080/api/pagehead/${id}`  PUT
//http://localhost:8080/api/pagehead/2 PUT
    async updatePageHead(req, res) {
        try {
            const {id} = req.params
			//console.log("id= ", id)
            const {name} = req.body
            const pagehead = await Table.Pagehead.update(
                {name},
                {where: { id: id },},
            )
            return res.json(pagehead)
        } catch (e) {
                return res.json(e)
        }  

    }

//http://localhost:8080/api/pagehead/2	DELETE    
    async deletePageHead(req, res) {
        try {
			const {id} = req.params
			const pagehead = await Table.Pagehead.destroy(
			{
                where: {id},
            },
			)
       		return res.json(pagehead)
		} catch (e) {
			return res.json(e)
		}
	

    }

//POST //http://localhost:8080/api/pagehead/search?name=name
//const product = await Table.Product.findAndCountAll({
//    attributes: ['name', 'artikul']});
async searchPageHead(req, res) {
    try {
        let {name} = req.query	
        const pagehead = await Table.Pagehead.findAll({
             where: { name: {[Op.substring]: name} },
           // offset: 10,
           // limit: 10
          });
          return res.json(pagehead)
    } catch (e) {
        return res.json(e)
    }
}

/*
where: {
    authorId: {
      [Op.eq]: 2,
    },
  },
*/

}

module.exports = new PageHeadController()