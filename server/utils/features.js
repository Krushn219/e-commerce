class Features {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //  Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);

        // Filter For Price and Rating
        // let queryStr = JSON.stringify(queryCopy);

        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, (key) => `$${key}`);
        // eq("="), gte(">="), gt(">"), lt("<"), lte("<="), ne("!=");

        // let arr = Object.keys(JSON.parse(queryStr))


        let arr = Object.entries(JSON.parse(queryStr))

        for (const [key, value] of Object.entries(arr)) {

            if (arr.values("isfeatured")) {
                this.query = this.query.find({ isFeatured: true });
                return this;

            }
            else if (arr.values("subcategory")) {
                this.query = this.query.find({ subCategory: value[1] });
                // return this;
            }
            else {
                this.query = this.query.find(JSON.parse(queryStr));
            }
            return this;
        }

        return this;
    }

}
module.exports = Features;


