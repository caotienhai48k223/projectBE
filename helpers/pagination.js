module.exports = (objectPagination, query, countProduct) => {
  if(query.page){
    objectPagination.currentPage = parseInt(query.page)
    if(!isNaN(objectPagination.currentPage)) {
      objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItems
    } else {
      objectPagination.skip = 0
    }
  }
  
  const totalPage = Math.ceil(countProduct/objectPagination.limitItems)
  objectPagination.totalPage = totalPage

  return objectPagination
}