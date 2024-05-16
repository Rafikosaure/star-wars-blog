const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
// const stuffRoutes = require('./routes/stuff')
// const userRoutes = require('./routes/user')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const { env } = require('./configuration/config.js')

/** Connexion à la base de données MongoDB */
mongoose
    .connect(
        `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@maincluster.1a02zbk.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster`,
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

/** Gestion des erreurs CORS */
app.use(cors())

/** Application d'un rate-limit */
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 100,
        message: 'Vous avez atteint la limite de 100 requêtes par minute !',
        headers: true,
    })
)

/** Configuration de Helmet */
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
)

/** Ici : les routeurs de l'application */
// app.use('/api/auth', userRoutes)
// app.use('/api/books', stuffRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app