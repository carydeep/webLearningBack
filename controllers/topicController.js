const TopicCourse = require("../models/Topic")

const topicController = {
    addTopicCourse:async(req,res)=>{
        try {
            const {name} = req.body
            const newTopic = new TopicCourse({name})
            const topic = await newTopic.save()
            return res.status(200).json(topic)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getTopicCourse:async(req,res)=>{
        try {
            const topics = await TopicCourse.find()
            const result = topics.map(({name,_id})=>{
                return {
                    name,
                    value:_id
                }
            })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = topicController