const { createClient } = require('redis');
require('dotenv').config() //NEED TO LOAD ENV VARS HERE

let client;
(async () => {
    client = createClient({url: `redis://${process.env.REDIS_HOST}:6379`,disableOfflineQueue: true});
    await client.connect();
    console.log("Redis connected");
})();

const set = (key,value, params)=> client.set(key,value,params);
const get = (key)=> client.get(key);
const del = (key)=> client.del(key);
const expire = (key,seconds)=> client.expire(key,seconds);
const exists = (key)=> client.exists(key);
const hSet = (key, field, val) => client.hSet(key, field, val);
const hGetAll = (key) => client.hGetAll(key);
const hGet = (key, val) => client.hGet(key, val);
const hDel = (key, val) => client.hDel(key, val);

const hmGet = (key, val) => client.hmGet(key, val);
const hmSet = (key, field, val) => client.sendCommand(['HGETALL', key, field, val])

module.exports = {
    set,
    get,
    del,
    expire,
    exists,
    hGetAll,
    hSet,
    hGet,
    hDel,
    hmGet,
    hmSet
}