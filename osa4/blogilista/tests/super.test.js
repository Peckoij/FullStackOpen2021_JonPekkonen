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
describe('blogs tests', () => {
  const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpwZWtrb25lbiIsImlkIjoiNjE3ZTM3YzQ0OGI3MjExNGIwNTkyM2RmIiwiaWF0IjoxNjM1NjY2MTg3fQ.QfOIDNmdAn1WrztmdEmChpw9_RS3J7p5vhc5i-4GR3g'
  // 4.9 test
  test('random entry has defined id fied ', async () => {
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
    //console.log(initialBlogs.body);
    await api
      .post('/api/blogs')
      .set('Authorization', token)     
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
      .set('Authorization', token)
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
        .set('Authorization', token)
        .send(blog)
        .expect(400)
    }
  })
})

describe('users tests', () => {
  // 4.16
  test('New user must be valid, or receive informative error', async () => {
    const newUsers = [{
      username: 'properUsername',
      name: "Good test User, but name in use",
      password: "properTestPassword"
    },
    {
      username: 'su',
      name: "short username",
      password: "properTestPassword"
    },
    {
      username: 'properUsername',
      name: "bad password",
      password: "pw"
    }
    ]
    const response0 = await api
      .post('/api/users')
      .send(newUsers[0])
      .expect(400)
    expect(response0.body.error).toBeDefined()
    const response1 = await api
      .post('/api/users')
      .send(newUsers[1])
      .expect(400)
    expect(response1.body.error).toBeDefined()
    const response2 = await api
      .post('/api/users')
      .send(newUsers[2])
      .expect(400)
    expect(response2.body.error).toBeDefined()

  })
})

test('new blog can not be added without authorisation', async () => {
    
  const newBlog = {
    title: 'Automated test blog',
    author: "Jest test system",
    url: "https://jestjs.io/",
    likes: 0
  }
  const initialBlogs = await api.get('/api/blogs')
  //console.log(initialBlogs.body);
  await api
    .post('/api/blogs')
    .set('Authorization', '')     
    .send(newBlog)
    .expect(401)
})



afterAll(() => {
  mongoose.connection.close()
})