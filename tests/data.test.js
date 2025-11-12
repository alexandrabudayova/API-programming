import request from 'supertest'
import app from '../app.js'

describe('Test GET with the path /data', () => {
     test("Response to the GET", async () => {
         const response = await request(app)
           .get("/data")
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
     })
})