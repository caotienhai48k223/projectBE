module.exports = (query) => {
  const filterStatus = [
    {
      name:"All Product",
      status:"",
      class:""
    },
    {
      name:"In Stock",
      status:"In Stock",
      class:""
    },
    {
      name:"Low Stock",
      status: "Low Stock",
      class:""
    }
  ]

  if (query.availabilityStatus) {
    const index = filterStatus.findIndex(item => item.status == query.availabilityStatus)
    filterStatus[index].class='active'
  } else {
    const index = filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class='active'
  }
  
  return filterStatus
}