//import Table from '../models/models.js'
const Table = require('../models/models')


class BasketController {
// 13:36
//http://localhost:8080/api/basket POST
	async createBasket(req, res) {
 
		try {
			const {userId, productId, amount, price, sum} = req.body
			const baskets = await Table.Basket.create({
				userId, productId, amount, price, sum,			
				})
				
				/*
                //++
				const priceP = await Table.Basket.findOne({
						where: {productId},
		
				})
									
				const remainder = priceP.amount - amount				
				const updPrice = await Table.Basket.update(
					{ amount: remainder },
					{where: {productId},}
					)	
				//console.log("updPrice", updPrice)	
			// ??? получить price  	по productId и из amount вычесть. Записать
            */
			return res.json(baskets)
		} catch (e) {
			return res.json(e)
		}		
	}

// В разработке, пока нет надобности	
// GET 	http://localhost:8080/api/basket
	async getAllBasket(req, res) {
        try {			
			//const params = req.params
			const { userId } = req.query
			//console.log("documentOrderId", documentOrderId)
			const baskets = await Table.Basket.findAll({ 
               // where: {userId,},//userId
				include: [{
				required: true,
				//	all: true,
				//where: {id: 1},
				attributes: ['id','name', 'img',],
				association: 'Products'
				}]
			
			})
       		
			return res.json(baskets)
		} catch (e) {
			return res.json(e)
		}
	}
	
// GET http://localhost:8080/api/basket/17	
	async getBasket(req, res) {		
		try {
			const {id} = req.params
			
			const baskets = await Table.Basket.findAll(
			{ where: {userId: id,},
				include: [{
				required: true,
				//	all: true,
				attributes: ['id','name', 'img',],
				association: 'Products'
				}]
				
			})		
	


				//НЕ работает ???  attributes: ['id', 'amount', 'price', 'sum', 'documentOrderId',]
			if(baskets){
       			return res.json(baskets)
			} else {
				return res.json({message: "Товар не найден с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}
	}
//	 В разработке, пока нет надобности	
//http://localhost:8080/api/basket/2 PUT
async updateBasket(req, res) {
	try {
		const {id} = req.params
		const baskets = await Table.Basket.update(
			{userId: 1,},
			{where: { productId: id },},
            {amount: 2, price: 4, sum: 8,}
		)
		return res.json(baskets)
	} catch (e) {
			return res.json(e)
	}
}
	
	
	
	
//http://localhost:8080/api/basket/2	DELETE
	async deleteBasket(req, res) {
		try {
			const {id} = req.params
			const baskets = await Table.Basket.destroy(
			{
                where: {userId: id},
            },
			)
       		return res.json(baskets)
		} catch (e) {
			return res.json(e)
		}
	}
	}



module.exports = new BasketController()
