const { db } = require("../database/connection.db");

const User = {
    async findByEmail({ email }){
        return db('users').where({ email}).first();
    },
    async findById( { id }){
        return db('users').where({ id }).first().select('id','firstName','lastName','email');
    },
    async signIn({ email , password }){
        return db('users').where({ email, password }).first();
    },
    async signUp(body){
       return db('users').insert(body); 
    }
}
module.exports =  User;