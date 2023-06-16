const { ObjectId } = require("mongodb");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
        title: {
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

    // Filter For Price and Rating
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq|ne)\b/g,
      (key) => `$${key}`
    );
    // eq("="), gte(">="), gt(">"), lt("<"), lte("<="), ne("!=");

    // let arr = Object.keys(JSON.parse(queryStr))
    let arr = Object.entries(JSON.parse(queryStr));

    for (const [key, value] of Object.entries(arr)) {
      if (value[0] === "isfeatured") {
        this.query = this.query.find({ isFeatured: true });
        // return this;
      } else if (value[0] === "istrending") {
        this.query = this.query.find({ isTrending: true });
        // return this;
      } else if (value[0] === "isspecial") {
        this.query = this.query.find({ isSpecial: true });
        // return this;
      } else if (value[0] === "isbestseller") {
        this.query = this.query.find({ isBestSeller: true });
        // return this;
      } else if (value[1] === "latest") {
        this.query = this.query.find().sort({ createdAt: "-1" }).limit(7);
        // return this;
      } else if (value[0] === "subcategories") {
        this.query = this.query.find({ subcategories: value[1] });
        // return this;
      } else {
        this.query = this.query.find(JSON.parse(queryStr));
      }
      return this;
    }
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = ApiFeatures;
