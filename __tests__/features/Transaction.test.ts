import supertest, {Response} from "supertest"

const req = supertest.agent("http://localhost:3000/api")


test('can get all transaction ', async ()=> {
  await req.get('/transactions')
    .expect(200)
    .then(res => {
    })
})

test( 'can add transaction', async ()=>{
  await req.post('/transactions')
    .send({
      "sourceWalletId": "tech",
      "destinationWalletId": null,
      "category": "Thue nha",
      "description": "Thue nha",
      "amount": 123,
      "paidAt": new Date().toDateString(),
      "createdAt": new Date().toDateString(),
      "updatedAt": new Date().toDateString(),
      "isPlaning": false,
    })
    .expect(200)
})
