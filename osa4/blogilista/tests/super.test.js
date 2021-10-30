const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// 4.8 test
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
/*
test('there are 5 blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(5)
})
*/
/*
test('the first blog is test blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe("Test blog")
})
*/
// 4.9 test
test('random entry has defined id fied ', async ()=>{
  const response = await api.get('/api/blogs')
  expect(response.body[Math.floor(Math.random(response.body.length))]).toBeDefined()
})

// 4.10 test
test('new blog can be added ', async () => {
  const newBlog = {
    title: 'Automated test blog',
    author: "Jest test system",
    url: "https://jestjs.io/",
    likes: 0
  }
  const initialBlogs = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.body.length + 1)
})

// 4.11 
test('new blog can be added, without likes property and it will be 0 in DB ', async () => {
  const newBlog = {
    title: 'Automated test blog',
    author: "Jest test system",
    url: "https://jestjs.io/"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.likes).toBe(0)
})

// 4.12
test('posting new blog fails without title and url', async () => {
  const newBlogs = [{
    title: 'Automated test blog',
    author: "Jest test system"
  },
  {
    author: "Jest test system",
    url: "https://jestjs.io/"
  }]

  for (let blog of newBlogs) {
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
  }
})


afterAll(() => {
  mongoose.connection.close()
})