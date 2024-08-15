module.exports = (query) => {
  let objectKeyword = {
    keyword: ""
  }
  if (query.keyword) {
    objectKeyword.keyword = query.keyword
    const regex = new RegExp(objectKeyword.keyword, "i")
    objectKeyword.regex = regex
  }
  
  return objectKeyword
}