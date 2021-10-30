const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //console.log(blogs);
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    //return blogs.reduce(reducer, 0)
    return blogs.reduce((sum, item) => { return sum + item.likes }, 0)
    /*
    return blogs.reduce((previousValue, currentValue) =>{ 
        console.log(previousValue.likes);
       console.log(currentValue.likes);
        return previousValue.likes + currentValue.likes 
    },0)
    */
}

const favoriteBlog = (blogs) => {
    let likes = 0
    let favBlog
    blogs.filter(blog => {
        if (blog.likes > likes) {
            favBlog = blog
            likes = blog.likes
        }
    })
    //console.log(favBlog);
    //console.log(likes);
    return favBlog
}

const mostBlogs = (blogs) => {
    // part1: create array [{author: zzzzzzz, blogs: X},...] of writers and their number of blogs
    // part2: pick from array object with most blogs
     // There is likely more nicer looking and efficient ways to do this but this is currently clearest way to write this for me. And it works.
    let authors = []
    blogs.forEach(blog=>{
        const authorIndex = authors.findIndex(x => x.author === blog.author)
        if (authorIndex>-1){
            authors[authorIndex].blogs = authors[authorIndex].blogs + 1
        }   else {
            authors = authors.concat({author: blog.author, blogs: 1})
        }
    })
    //console.log(authors);

    let writtenBlogs = 0
    let favBlogger
    authors.filter(author => {
        if (author.blogs > writtenBlogs) {
            favBlogger = author
            writtenBlogs = author.blogs
        }
    })
    //console.log(favBlog);
    //console.log(likes);
    return favBlogger
    
}

const mostLiked = (blogs) => {
    // Somewhat similar approach as in mostBlogs, this time collect likes instead of blogs
    // create array [{author: zzzzzzz, likes: X},...] 
    let authors = []
    blogs.forEach(blog=>{
        const authorIndex = authors.findIndex(x => x.author === blog.author)
        if (authorIndex>-1){
            authors[authorIndex].likes = authors[authorIndex].likes + blog.likes
        }   else {
            authors = authors.concat({author: blog.author, likes: blog.likes})
        }
    })
    //console.log(authors);

    let mostLikes = 0
    let favBlogger
    authors.filter(author => {
        if (author.likes > mostLikes) {
            favBlogger = author
            mostLikes = author.likes
        }
    })
    //console.log(favBlog);
    //console.log(likes);
    return favBlogger
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}