
//import fs from 'fs'
//import path  from 'path'
//import {v4 as uuidv4} from 'uuid'
//import Table from '../models/models.js'


//import {Op} from 'sequelize'
//import { type } from 'os'

const fs = require('fs')
const path = require('path')
const {v4 }  = require('uuid')
const Table = require('../models/models')

const {Op} = require('sequelize')
const { type }  = require('os')

const uuidv4 = v4

class ProductController { 


// 13:36
//POST http://localhost:8080/api/product 
//{"products":[{"name": "Куллер","img": "kartinka", "pageId": 1}]} - req.body
async createProduct(req, res) {
    //console.log("------------------./ : ", path.resolve("./", 'static'))
    //console.log("process.cwd() : ", process.cwd())
    try {
          
       // 1 Имя файла// 2 строка или буффер// 3 {encoding: 'base64'} //fs.writeFile()
        const {name, pageId, price, img, binarydata, picabox} = req.body
        
        let fileName = uuidv4() + ".jpg"
        if (binarydata) {
            // Создание папки
            if(!fs.existsSync('static')) {
				fs.mkdirSync('static')
			}	
            fs.writeFile(path.resolve("./", 'static', fileName), img,{encoding: 'base64'}, (err) => {
                if (err) {
                    console.log('Файл не сохранён!', err)
                } else { console.log('Файл сохранён!')}               
              })
//TEST
//            } else if (req.files) { 
//                // Создание папки
//                if(!fs.existsSync('static')) {
//                    fs.mkdirSync('static')
//                }	          
//            const {img} = req.files
//            img.mv(path.resolve("./", 'static', fileName))
//            // -- img.mv(path.resolve(__dirname, '..', 'static', fileName))
//TEST             
            } else {
                fileName = img
               // console.log("img", img)
            }  
        const result = await Table.Product.create({name, pageId, img:fileName, price})
        return res.json(result)





        /*
		const arrays = req.body    
		//console.log("arrays.products", arrays.products)
		
        const result = arrays.products.map((products) => { 		  
			return Table.Product.create({ 
					name: products.name, 
					img: products.img, //fileName
                    pageId: products.pageId,
                    attributes: ['id','name', 'img',]
                    })   
		  })

      Promise.all(result).then(results => {
        return res.json(results)
      })      
        */

    } catch (e) {
        return res.json(e)
    }		
}
/*
//POST http://localhost:8080/api/product/one 
async createOneProduct(req, res) {

    try {
		const {name, img} = req.body
		const product = await Table.Product.create({name, img}) 
		return res.json(product)
    } catch (e) {
        return res.json(e)
    }		
}
*/
//https://test-back-npfu.onrender.com:8081/api/product
//GET http://localhost:8080/api/product?limit=3&page=2
async getAllProduct(req, res) {
    try {	   
		let {limit, page} = req.query	
		limit = limit || 5 // На каждой странице
		page = page || 1
		let offset = page * limit - limit
		let products;	
        products = await Table.Product.findAndCountAll({ limit, offset, 
			attributes: ['id','name', 'img', 'price',], 
            //where: {pageId: 3},
            //order: [['pageId', 'DESC']], //'DESC' 'ASC'
            include: [{
                //required: true,
                //where: {id: 1},
                attributes: ['id','name', ],
                association: "Pages"
                }]
        })
           return res.json(products)
    } catch (e) {
        return res.json(e)
    }
}


//GET http://localhost:8080/api/product/page?limit=3&page=2&pageId=23
async getAllProductPage(req, res) {
    try {	   
		let {limit, page, pageId} = req.query	
		limit = limit || 5 // На каждой странице
		page = page || 1
		let offset = page * limit - limit
		let products;	
        products = await Table.Product.findAndCountAll({ limit, offset, 
			attributes: ['id','name', 'img', 'price',], 
            where: {pageId},
            order: [['pageId', 'DESC']], //'DESC' 'ASC'
            include: [{
                //required: true,
                //where: {id: 1},
                attributes: ['id','name', ],
                association: "Pages"
                }]
        })
           return res.json(products)
    } catch (e) {
        return res.json(e)
    }
}

//GET http://localhost:8080/api/product/2
async getOneProduct(req, res) {
    
    try {
        const {id} = req.params
        const product = await Table.Product.findOne( 
        {
			attributes: ['id','name',],
            where: {id},
        },
        )
           return res.json(product)
    } catch (e) {
        return res.json(e)
    }
}


//PUT //http://localhost:8080/api/product/2	
//await User.upsert({ id: 3, lastName: "Doe", });
async updateProduct(req, res) {
    try {	
    const {id} = req.params
    const {name, img} = req.body
    const product = await Table.Product.update(
        //{ name, img, },
        {pageId: 2},
        {where: { id: 27 },},
    )
    return res.json(product)
} catch (e) {
    return res.json(e)
}
}



//DELETE //http://localhost:8080/api/product/2	
async deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = await Table.Product.destroy(
        {
            where: {id},
        },
        )
           return res.json(product)
    } catch (e) {
        return res.json(e)
    }
}
//POST //http://localhost:8080/api/product/search
//const product = await Table.Product.findAndCountAll({
//    attributes: ['name', 'img']});
async searchProduct(req, res) {
    try {
        let {name} = req.query	
        const {rows, count} = await Table.Product.findAndCountAll({
             where: {name: {[Op.substring]: name }},
           // offset: 10,
            limit: 10
          });
         // console.log("count =", count);
          //console.log("rows = ", rows);
          return res.json(rows)
    } catch (e) {
        return res.json(e)
    }
}

}




module.exports = new ProductController()