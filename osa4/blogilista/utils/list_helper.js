const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //console.log(blogs);
    const reducer = (sum, item) => {
        return sum + item.likes
      }
    return blogs.reduce(reducer, 0)
    /*
    return blogs.reduce((previousValue, currentValue) =>{ 
        console.log(previousValue.likes);
       console.log(currentValue.likes);
        return previousValue.likes + currentValue.likes 
    },0)
    */
}


module.exports = {
    dummy,
    totalLikes
}