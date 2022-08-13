const GroupCourse = require("../models/Group")

const groupController = {
    addGroupCourse:async(req,res)=>{
        try {
            const {name} = req.body
            const newGroup = new GroupCourse({name})
            const group = await newGroup.save()
            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getGroupCourse:async(req,res)=>{
        try {
            const groups = await GroupCourse.find()
            const result = groups.map(({_id,name})=>{
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

module.exports = groupController