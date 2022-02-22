const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = blogs => {
  let likes = 0
  let title
  let author
  blogs.forEach(blog => {
    if (blog.likes > likes) {
      likes = blog.likes
      title = blog.title
      author = blog.author
    }
  })
  return { title, author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
