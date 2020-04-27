const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => (sum = sum + blog.likes), 0)
}

const favoriteBlog = blogs => {
  if (!blogs.length) return null

  let fav = { ...blogs[0] }
  blogs.forEach(blog => {
    if (fav.likes < blog.likes) fav = { ...blog }
  })

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

const mostBlogs = blogs => {
  if (!blogs.length) return null

  let authors = []
  let blogCount = []

  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      blogCount[authors.indexOf(blog.author)]++
    } else {
      authors.push(blog.author)
      blogCount.push(1)
    }
  })

  let maxBlogs = Math.max(...blogCount)
  let maxAuthor = authors[blogCount.indexOf(maxBlogs)]

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  }
}

const mostLikes = blogs => {
  if (!blogs.length) return 0

  let authors = []
  let likesCount = []

  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      likesCount[authors.indexOf(blog.author)] += blog.likes
    } else {
      authors.push(blog.author)
      likesCount.push(blog.likes)
    }
  })

  const maxLikes = Math.max(...likesCount)
  const maxAuthor = authors[likesCount.indexOf(maxLikes)]

  return {
    author: maxAuthor,
    likes: maxLikes,
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
