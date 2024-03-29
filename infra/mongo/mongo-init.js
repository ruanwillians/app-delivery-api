const conn = new Mongo();

const adminDB = conn.getDB('admin');
adminDB.auth('helpdev', '123456');

const codeBurgerDB = conn.getDB('code-delivery');

codeBurgerDB.createCollection('user');

print("Banco de dados 'code-delivery' e coleção 'products' criados.");
