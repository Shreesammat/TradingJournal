import express from 'express'

const userRoutes = express.Router();

userRoutes.get('/profile', profile)
userRoutes.get('/heatmap', heatmap)
userRoutes.get('/journals', getJournals)
userRoutes.post('/newJournal', newJournal)

export default userRoutes