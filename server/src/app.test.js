const request = require("supertest");
const app = require("./app");

describe("app", () => {
  describe("GET /restaurants", () => {
    it("should retrieve all restaurants information", async () => {
      const expected = [
        {
          id: "616005cae3c8e880c13dc0b9",
          name: "Curry Place",
          description:
            "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
          image: "https://i.ibb.co/yftcRcF/indian.jpg",
        },
        {
          id: "616005e26d59890f8f1e619b",
          name: "Thai Isaan",
          description:
            "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
          image: "https://i.ibb.co/HPjd2jR/thai.jpg",
        },
        {
          id: "616bd284bae351bc447ace5b",
          name: "Italian Feast",
          description:
            "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
          image: "https://i.ibb.co/0r7ywJg/italian.jpg",
        },
      ];

      await request(app)
        .get("/restaurants")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => expect(res.body).toEqual(expected));
    });
  });
  describe("GET /restaurants/:id", () => {
    it("should retrieve a single restaurant data by id", async () => {
      const expected = {
        id: "616005e26d59890f8f1e619b",
        name: "Thai Isaan",
        description:
          "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
        image: "https://i.ibb.co/HPjd2jR/thai.jpg",
      };

      await request(app)
        .get(`/restaurants/${expected.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => expect(res.body).toEqual(expected));
    });
    it("should send a 400 status invalid id provided", async () => {
      const expectedStatus = 400;

      await request(app).get("/restaurants/11111111").expect(expectedStatus);
    });
    it("should send a 404 status restaurant id does not exist", async () => {
      const expectedStatus = 404;

      await request(app)
        .get("/restaurants/61460db44aa0cf7175467752")
        .expect(expectedStatus);
    });
  });
  describe("POST /reservations", () => {
    it("should create a reservation and send a 201 status", async () => {
      const expectedStatus = 201;
      const body = {
        partySize: 4,
        date: "2023-11-17T06:30:00.000Z",
        restaurantName: "Island Grill",
      };

      await request(app)
        .post(`/reservations/`)
        .send(body)
        .expect(expectedStatus)
        .expect((response) => {
          expect(response.body).toEqual(expect.objectContaining(body));
          expect(response.body.id).toBeTruthy();
        });
    });
    it("should send a 400 invalid request body", async () => {
      const expectedStatus = 400;
      const body = {
        partySize: 0,
        date: "2023-11-17T06:00:00.000Z",
        restaurantName: "Island Grill",
      };

      await request(app)
        .post("/reservations")
        .send(body)
        .expect(expectedStatus);
    });
  });
  describe("GET /reservations", () => {
    it("should retrieve all reservations", async () => {
      const expectedBody = [
        {
          id: "507f1f77bcf86cd799439011",
          partySize: 4,
          date: "2023-11-17T06:30:00.000Z",
          userId: "mock-user-id",
          restaurantName: "Island Grill",
        },
        {
          id: "614abf0a93e8e80ace792ac6",
          partySize: 2,
          date: "2023-12-03T07:00:00.000Z",
          userId: "mock-user-id",
          restaurantName: "Green Curry",
        },
      ];
      await request(app)
        .get("/reservations")
        .set("Application", " application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => expect(res.body).toEqual(expectedBody));
    });
  });
  describe("GET /reservations/:id", () => {
    it("should retrieve a single reservation data by id", async () => {
      const expectedBody = {
        id: "507f1f77bcf86cd799439011",
        partySize: 4,
        date: "2023-11-17T06:30:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Island Grill",
      };

      await request(app)
        .get(`/reservations/${expectedBody.id}`)
        .set("Application", " application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => expect(res.body).toEqual(expectedBody));
    });
    it("should respond with a 400 status invalid id provided", async () => {
      const expectedStatus = 400;

      await request(app).get("/reservations/0000000").expect(expectedStatus);
    });
    it("should send a 404 status reservation id does not exist", async () => {
      const expectedStatus = 404;

      await request(app)
        .get("/reservations/61460db44aa0cf7175467752")
        .expect(expectedStatus);
    });
    it("should send a 403 status user does not have permission to access this reservation", async () => {
      const expectedStatus = 403;

      await request(app)
        .get("/reservations/61679189b54f48aa6599a7fd")
        .expect(expectedStatus);
    });
  });
});
