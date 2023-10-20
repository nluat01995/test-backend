const { db } = require("../database/connection.db")

const Token = {
    async createdOrUpdateToken({ id, refreshToken, expiresIn }) {

        const user = await db('tokens').where({ userId: id }).first();
        if (!user) {
            return await db('tokens').insert({
                userId: id,
                refreshToken,
                expiresIn
            })
        }
        return await db('tokens').update({
            refreshToken,
            expiresIn
        }).where('userId', id)
    },
    async findByUserIdToken({ userId }) {
        const user = await db('tokens').where({ userId }).first();
        if (user) {
            return await db('tokens').update({
                refreshToken: null,
                expiresIn: null
            }).where('userId', userId)
        }
        return null
    },
    async findRefreshToken({ refresh }) {
        return await db('tokens').where({ refreshToken: refresh }).first();
    }

}
module.exports = Token;