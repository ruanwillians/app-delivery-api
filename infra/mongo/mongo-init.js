const conn = new Mongo();

const adminDB = conn.getDB('admin');
adminDB.auth('helpdev', '123456');

const codeBurgerDB = conn.getDB('code-burger');

codeBurgerDB.createCollection('user');

print("Banco de dados 'code-burger' e coleção 'products' criados.");
