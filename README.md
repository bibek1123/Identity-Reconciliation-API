# Identity Reconciliation API

This project provides a RESTful API to manage and identify customer contacts based on phone numbers and emails. It consolidates contacts by distinguishing between primary and secondary contact records, ensuring clean and reliable customer data management.

**Features**
1) Create and retrieve customer contacts.

2) Identify customers by phone number and/or email.

3) Automatically link secondary contacts to a primary contact.

4) Consolidated contact response including all associated emails and phone numbers.

5) Handles edge cases such as multiple primary contacts and contact updates.

---

## 📌 Problem

Customers often place multiple orders using different contact details (email/phone). This leads to fragmented identities. Our service reconciles them into a **single unified identity**, ensuring a seamless and personalized customer journey.

---

## 🔗 Live Demo

> 🚀 **Live Endpoint:** `https://identity-reconciliation-api-go9n.onrender.com/api/v1/identify`  
> 📬 **Method:** `POST`  
> 📄 **Content-Type:** `application/json`

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js  
- **Language:** JavaScript  
- **Database:** MySQL  
- **ORM:** Sequelize  
- **VALIDATION:** Joi  
- **Testing:** Postman (10 structured test cases)  
- **Deployment:** [Render.com](https://render.com)

---

---
## ⚙️ Technical Highlights

### 🧑‍💻 Coding Best Practices

- **Modular Code Structure**  
  Separated service logic (`contactService.js`),  (`identifyService.js`) from controller/handler for better maintainability and testability.

- **Consistent Error Handling**  
  Used try-catch blocks and proper transaction rollback to handle errors gracefully without data corruption. Errors are logged or re-thrown with meaningful context to debugging.

- **Clear Function Responsibilities**  
  Each function has a single responsibility, such as `createContact`, `findExistingContacts`, `updateToSecondaryBatch`, and `formatConsolidatedResponse`, improving readability and reusability.

- **Use of Async/Await**  
  Asynchronous operations are handled cleanly with async/await, avoiding callback hell and improving code clarity.

- **Descriptive Variable Naming**  
  Variables and functions are named meaningfully for easy understanding of their purpose.

- **Transaction Management**  
  Used database transactions to group multiple related queries ensuring atomicity and consistency, preventing partial updates and race conditions.

- **Immutability in Data Handling**  
  Avoided mutating input data directly by using copies and filtered arrays for safer operations, reducing side effects and bugs.

---

### 💾 Database Optimization

- **Indexed Search Fields**  
  Indexed `phoneNumber`, `email` and `linkedId` columns in MySQL for fast lookups on common query parameters.

- **Efficient Querying**  
  Combined queries using Sequelize’s `Op.or` to fetch contacts matching either phone or email in a single optimized query.

- **Batch Updates**  
  Updated multiple primary contacts to secondary in one batch query (`updateToSecondaryBatch`), reducing the number of queries and improving performance.

- **Minimized Database Calls**  
  Reused data and fetched all related contacts in one go rather than multiple redundant queries.

- **Use of Transactions**  
  Wrapped create and update operations inside transactions to prevent partial updates, race conditions, and maintain data integrity.

- **Ordering by Creation Date**  
  Used ordered queries by `createdAt` to easily determine the oldest (primary) contact efficiently.

---

### 🔍 Additional Benefits

- Separation of concerns promotes scalability and ease of testing.  
- Leveraged Sequelize ORM features to abstract complex SQL logic while maintaining performance.  
- Meaningful naming and modularization reduce cognitive load, speeding up onboarding and reviews.  
- Immutability enhances code safety in asynchronous flows.  
- Indexing and batch processing directly improve response time and scalability under load.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bibek1123/Identity-Reconciliation-API.git
cd identity-reconciliation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file in the root:

```env
PORT=3000
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=bitespeed
NODE_ENV=development
```

### 4. Run Migrations / Sync Models

```bash
npm run migrate      # or use sequelize-cli
```

Or if you're using `sync` with Sequelize:

```js
sequelize.sync({ alter: true });
```

### 5. Start the Server

```bash
npm run dev
```

> The server runs at `http://localhost:3000`
> Base url is `http://localhost:3000/api/v1`

---

## 📬 API: `/identify` (POST)

### 🔸 Request

```json
{
  "email": "doc@fluxkart.com",
  "phoneNumber": "1234567890"
}
```

- Either `email` or `phoneNumber` must be present (or both).
- Validates contact, checks for existing entries, reconciles identity.

---

### 🔸 Response Format

```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["doc@fluxkart.com", "emmett@fluxkart.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

---

## 🧪 Postman Test Cases

📁 `postman/IdentityReconciliation.postman_collection.json`
This project includes **10+ test cases** that are covered in detail in the provided Postman collection.

You can find them inside the **postman_collections/** folder

## 🧠 Identity Resolution Logic

### Database Schema (`Contact` Table)

| Field         | Type    | Description                      |
|---------------|---------|----------------------------------|
| id            | INT     | Auto-incremented primary key     |
| email         | VARCHAR | Optional email                   |
| phoneNumber   | VARCHAR | Optional phone number            |
| linkedId      | INT     | Points to primary contact's ID   |
| linkPrecedence| ENUM    | `primary` or `secondary`         |
| createdAt     | TIMESTAMP | Auto-managed                    |
| updatedAt     | TIMESTAMP | Auto-managed                    |
| deletedAt     | TIMESTAMP | For soft deletes               |
---

## 🚀 Deployment

You can deploy this app using:

- [Render.com](https://render.com)  
- [Railway](https://railway.app)  
- [Vercel](https://vercel.com)  
- [Heroku](https://www.heroku.com)

> 📦 Ensure the `.env` values for production are set appropriately.

---

## ✅ Submission Checklist

- ✅ Functional `/identify` endpoint  
- ✅ Used MySQL with Sequelize  
- ✅ Hosted publicly  
- ✅ Postman collection added with 10+ test cases
- ✅ Structured professional README  

---

## 👤 Author

**Bibek Bhagat**  
[GitHub](https://github.com/bibek1123) • [LinkedIn](https://linkedin.com/in/bibekbhagat)
