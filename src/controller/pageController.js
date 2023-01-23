//import Table from '../models/models.js'
//import {Op} from 'sequelize'


const Table = require('../models/models')
const {Op} = require('sequelize')

class PageController {
// 13:36
//POST http://localhost:8080/api/page
    async createPage(req, res) {
 
		try {
			
			const {name, pageheadId} = req.body
			const page = await Table.Page.create(
                {name,pageheadId,})
			return res.json(page)
		} catch (e) {
			return res.json(e)
		}		
	}

    
// get http://localhost:8080/api/page
    async getAllPages(req, res) {
        try {		
			//let {limit, pages} = req.query	
			//limit = limit || 5 // На каждой странице
			//pages = pages || 1
			//let offset = pages * limit - limit
			let page;	
			page = await Table.Page.findAndCountAll(
            //{limit, offset, attributes: ['id','name', 'pageheadId'], 
			{attributes: ['id','name', 'pageheadId'],
            //where: { pageheadId: 2 },
            order: [['pageheadId', 'ASC']],
            include: [{
                //required: true,
                //where: {id: 1},
                attributes: ['id', 'name', ],
                association: "Pageheads"
                }]
            })
       		return res.json(page)
		} catch (e) {
			return res.json(e)
		}

    }

// GET http://localhost:8080/api/page/1	    
    async getOnePage(req, res) {
        try {
			const {id} = req.params
			const page = await Table.Page.findOne(
				{ where: {pageheadId:id}, },
			)
			if(page){
       			return res.json(page)
			} else {
				return res.json({message: "Страница не найдена с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}     

    }

//http://localhost:8080/api/page/${id}`  PUT
//http://localhost:8080/api/page/2 PUT
    async updatePage(req, res) {
        try {
            const {id} = req.params
			//console.log("id= ", id)
            const {name, pageheadId} = req.body
            const page = await Table.Page.update(
                {name, pageheadId},
                {where: { id: id },},
            )
            return res.json(page)
        } catch (e) {
                return res.json(e)
        }  

    }

//http://localhost:8080/api/page/2	DELETE    
    async deletePage(req, res) {
        try {
			const {id} = req.params
			const page = await Table.Page.destroy(
			{
                where: {id},
            },
			)
       		return res.json(page)
		} catch (e) {
			return res.json(e)
		}
	

    }

//POST //http://localhost:8080/api/page/search?name=name
//const product = await Table.Product.findAndCountAll({
//    attributes: ['name', 'artikul']});
async searchPage(req, res) {
    try {
        let {name} = req.query	
        const page = await Table.Page.findAll({
             where: { name: {[Op.substring]: name} },
           // offset: 10,
           // limit: 10
          });
          return res.json(page)
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

module.exports = new PageController()