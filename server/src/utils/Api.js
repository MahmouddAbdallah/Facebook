'use strick'
class ApiFeatures {
    constructor(Model, req) {
        this.Model = Model.find();
        this.req = req
    }
    filters(filter) {
        //(gte | gt | lt | lte )
        const { query } = this.req;
        let newQuery = JSON.stringify(query)
        newQuery = JSON.parse(newQuery.replace(/\b(gte|lte|lt|gt)/g, match => `$${match}`))
        const words = ["page", "limit", "sort", "fields", "keyword"]
        words.forEach((element) => {
            delete newQuery[element]
        })
        this.Model = this.Model.find(filter ? { user: filter } : newQuery)
        return this
    }
    sort() {
        let sort = this.req.query.sort || "-createdAt"
        if (sort) {
            sort = sort.split(",").join(" ")
        } else {
            sort = "-createdAt"
        }
        this.Model = this.Model.sort(sort);
        return this
    }
    fields() {
        let { fields } = this.req.query
        if (fields) {
            fields = fields.split(",").join(" ")
        } else {
            fields = "-__v"
        }
        this.Model = this.Model.select(fields);
        return this
    }
    search() {
        const keyword = this.req.query.keyword
        if (keyword) {
            let search = {}
            search.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { first_name: { $regex: keyword, $options: 'i' } },
                { last_name: { $regex: keyword, $options: 'i' } }
            ]
            this.Model = this.Model.find(search)
        }
        return this
    }
    populate(path, select) {
        this.Model = this.Model.populate({ path, select })
        return this
    }
    populatepath(path, populatePath, select) {
        this.Model = this.Model.populate({ path, populate: { path: populatePath }, select })
        return this
    }
}
module.exports = ApiFeatures