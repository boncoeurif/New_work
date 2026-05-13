# Reflection Questions

### 1. What was harder when using the http module?
Using the `http` module required more manual effort for tasks that are usually abstracted. For example, I had to manually parse the URL to extract query parameters using the `url` module, manually set response headers (like `Content-Type`), and explicitly handle different routes and methods with `if/else` blocks. Error handling also required more repetitive code for sending status codes and stringifying JSON responses.

### 2. What advantages did Express provide?
Express provided a much cleaner and more declarative API. It automatically handles query parameter parsing (`req.query`), simplifies sending JSON responses (`res.json`), and provides a robust routing system. The middleware support made it very easy to separate validation logic from the actual route handler, leading to more organized and readable code.

### 3. Why is middleware useful?
Middleware is useful because it allows you to intercept requests before they reach the final route handler. This is perfect for cross-cutting concerns like validation, authentication, or logging. It helps in keeping the route handlers focused on their primary logic (like conversion) while offloading boilerplate or shared logic to reusable functions.

### 4. Which version was easier to maintain?
The Express version is significantly easier to maintain. The separation of concerns (validation logic in a separate file/middleware) makes the codebase modular. Adding new features or modifying existing ones is simpler because the routing is clearly defined, and the boilerplate code is minimized.
