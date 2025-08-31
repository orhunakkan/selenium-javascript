---

### 🔗 Base URL

```
https://gorest.co.in
```

---

### 👥 Users

```
GET     /public/v2/users
GET     /public/v2/users/{id}
POST    /public/v2/users
PUT     /public/v2/users/{id}
PATCH   /public/v2/users/{id}
DELETE  /public/v2/users/{id}
```

---

### 📝 Posts

```
GET     /public/v2/posts
GET     /public/v2/posts/{id}
POST    /public/v2/users/{user_id}/posts
PUT     /public/v2/posts/{id}
PATCH   /public/v2/posts/{id}
DELETE  /public/v2/posts/{id}
```

---

### 💬 Comments

```
GET     /public/v2/comments
GET     /public/v2/comments/{id}
POST    /public/v2/posts/{post_id}/comments
PUT     /public/v2/comments/{id}
PATCH   /public/v2/comments/{id}
DELETE  /public/v2/comments/{id}
```

---

### ✅ Todos

```
GET     /public/v2/todos
GET     /public/v2/todos/{id}
POST    /public/v2/users/{user_id}/todos
PUT     /public/v2/todos/{id}
PATCH   /public/v2/todos/{id}
DELETE  /public/v2/todos/{id}
```

---

🔹 These **cover every resource** (Users, Posts, Comments, Todos) and every HTTP verb GoREST supports (GET, POST, PUT, PATCH, DELETE).
🔹 Endpoints are **stable and versioned** (`/public/v2/…`).
🔹 You can fully practice:

* Authentication (Bearer token required for write operations)
* Pagination & query params
* CRUD flows
* Nested resources (posts/comments/todos under a user or post)

There aren’t any “hidden” endpoints—this is the entire surface area for v2 REST testing.

---

Would you like me to make this into a **visual API map** (diagram showing relationships and methods)?
