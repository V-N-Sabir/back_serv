const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//import sequelize from "../db.js"
//import DataTypes from "sequelize"



const Pagehead = sequelize.define('pagehead', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},   
})


const Page = sequelize.define('page', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},   
})



const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    img: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, }, //allowNull:false
})


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    //name: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//    name: {type: DataTypes.STRING, unique: true,},
	amount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
	sum: {type: DataTypes.INTEGER},
})



const Status_Document = sequelize.define('status_document', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},  
})


// Документ 
const Document_order = sequelize.define('document_order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
	// Phone number 
	comment: {type: DataTypes.STRING},
	totalPrice: {type: DataTypes.INTEGER,},
    //comment: {type: DataTypes.DATE, timestamps: true}    
})

// ТЧ Товары
const Sales_table = sequelize.define('sales_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	amount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
	sum: {type: DataTypes.INTEGER},
})


//Document_order.sync()
//Sales_table.sync()
// id Контрагента в документе
User.hasMany(Document_order)
// Kontragent в поле include получает данные из другой таблицы по условию doc.kontragentId = kontr.id
Document_order.belongsTo(User, { as: 'User', foreignKey: 'userId'})

// Sales_table -  указыватся id от Document_order
Document_order.hasMany(Sales_table)
Sales_table.belongsTo(Document_order, { as: 'Salestables', foreignKey: 'documentOrderId'})

// В ТЧ данные товаров !!!
Product.hasMany(Sales_table)
Sales_table.belongsTo(Product, { as: 'Products', foreignKey: 'productId'})

// id Статуса в документе
Status_Document.hasMany(Document_order)
Document_order.belongsTo(Status_Document)


// id Page в Product
Page.hasMany(Product)
// Product в поле include получает данные из другой таблицы по условию Page.Id = Product.pageId
Product.belongsTo(Page, { as: 'Pages', foreignKey: 'pageId'})

// Связь c Page




// id Page_Head в Page
Pagehead.hasMany(Page)
// Pageheads в поле include получает данные из другой таблицы по условию doc.pageheadId = kontr.id
Page.belongsTo(Pagehead, { as: 'Pageheads', foreignKey: 'pageheadId'})


// id User в Basket
User.hasMany(Basket)
Basket.belongsTo(User, ) //{ as: 'Pageheads', foreignKey: 'userId'}

// id Product в Basket
Product.hasMany(Basket)
// В Basket можно получить данные о Product id, name и т.д.
Basket.belongsTo(Product, { as: 'Products', foreignKey: 'productId'})

//Document_order.sync({ alter: true })
//Sales_table.sync({ alter: true })



//Basket.sync() //- создает таблицу при отсутствии (существующая таблица остается неизменной)
//Basket.sync({ force: true }) // - удаляет существующую таблицу и создает новую
//Basket.sync({ alter: true }) // - приводит таблицу в соответствие с моделью
////////////////////////////////////////////////
/*

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
  
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Kontragent = sequelize.define('kontragent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    inn: {type: DataTypes.STRING},
	number_phone: {type: DataTypes.STRING},
	
})



const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    artikul: {type: DataTypes.STRING},
})


// ТЧ Товары
const Sales_table = sequelize.define('sales_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//    name: {type: DataTypes.STRING, unique: true,},
	amount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
	sum: {type: DataTypes.INTEGER},
})


const Status_Document = sequelize.define('status_document', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},  
})

// Документ 
const Document_order = sequelize.define('document_order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    date_doc: {type: DataTypes.DATE, timestamps: true}    
})

const Prise_product = sequelize.define('prise_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	amount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER}, 
})

// id Товара в ТЧ Prise_product
Product.hasMany(Prise_product)
Prise_product.belongsTo(Product, { as: 'ProductPrise', foreignKey: 'productId'}) //{ as: 'ProductPrise', foreignKey: 'productId'} 

//User.sync() - создает таблицу при отсутствии (существующая таблица остается неизменной)

// Sales_table -  указыватся id от Document_order
Document_order.hasMany(Sales_table)
Sales_table.belongsTo(Document_order)


// id Статуса в документе
Status_Document.hasMany(Document_order)
Document_order.belongsTo(Status_Document)

// id Контрагента в документе
Kontragent.hasMany(Document_order)
// Kontragent в поле include получает данные из другой таблицы по условию doc.kontragentId = kontr.id
Document_order.belongsTo(Kontragent, { as: 'Kontragent', foreignKey: 'kontragentId'}) //, 

// id пользователя в документе
User.hasMany(Document_order)
Document_order.belongsTo(User)


// id Товара в ТЧ Sales_table
Product.hasMany(Sales_table)
Sales_table.belongsTo(Product, { as: 'Products', foreignKey: 'productId'} ) //, { as: 'Products', foreignKey: 'productId'} 


//Prise_product.sync()

User.hasOne(Basket)
Basket.belongsTo(User)



Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })
*/

module.exports = {
    Pagehead, 
    Page,
    Product,
    User,
    Basket,
	Status_Document,
	Document_order,
	Sales_table,
 /* 
  Kontragent,
  Sales_table,
  Prise_product,*/


}
//export default Document_order
