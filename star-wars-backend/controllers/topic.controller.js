const Topic = require('../models/topic.model.js')
const Category = require('../models/category.model.js')
const Post = require('../models/post.model.js')
require('dotenv').config()


exports.getTopicsByCategory = async (req, res) => {
    
    // Récupérer l'id de la catégorie courante
    const categoryId = req.params.id

    // Vérifier si la catégorie n'est pas undefind
    if (!categoryId) res.status(404).json({
        message: "Identifiant incorrect !"
    })

    // Trouver les topics liés à cette catégorie
    const currentCategoryWithTopics = await Category.findById(categoryId).populate("topics")

    // Vérifier que les données ne sont pas undefined
    if (!currentCategoryWithTopics) res.status(404).json({
        message: "Category not found!"
    })
    
    // Envoyer la catégorie ainsi que le tableau des topics
    res.status(200).json(
        currentCategoryWithTopics
    )
}


exports.createTopic = async (req, res) => {

    // Récupérer l'id de la catégorie courante
    const categoryId = req.params.id

    // Avec cet id, récupérer la catégorie courante elle-même
    const currentCategory = await Category.findById(categoryId)
    if (!currentCategory) res.status(404).json({
        message: "Category not found!"
    })

    // Créer le topic et l'insérer dans la catégorie courante
    const newTopic = await Topic.create(req.body.topic)
    if (newTopic) {
        newTopic.save()
        currentCategory.topics.push(newTopic)
        currentCategory.save()
    } else {
        res.status(500).json({
            message: "Echec de la création du topic !"
        })
    }

    // Créer un premier post et l'insérer dans le nouveau topic
    let reqPost = req.body.post
    reqPost.title = newTopic.title
    const newPost = await Post.create(reqPost)
    if (newPost) {
        newPost.save()
        newTopic.posts.push(newPost)
        newTopic.save()
        res.status(201).json({
            topic: newTopic,
            post: newPost
        })
    } else {
        res.status(400).json({
            message: "Echec de la création du post !"
        })
    }
}