📝 Task
- Develop an API using the MSC (Model-Service-Controller) architecture!
- The API to be built is a dropshipping sales management system where it will be possible to create, view, delete, and update products and sales. You should use the MySQL database for data management. Additionally, the API should be RESTful.

📄 API Documentation
- Description Endpoint
- List products GET /products
- List products by ID GET /products/:id
- Unit tests tests/unit
- Create product POST /products
- Product validations POST /products
- Unit tests tests/unit
- Validate and create sales POST /sales
- Unit tests tests/unit
- List sales GET /sales
- List sale by ID GET /sales/:id
- Update a product PUT /products/:id
- Unit tests tests/unit
- Delete a product DELETE /products/:id
- Delete a sale DELETE /sales/:id
- Update a sale PUT /sales/:id
- Search products GET /products/search?q=searchTerm

💡 Tools
- Programming Language: JavaScript
- Development Framework: Express
- Database: MySQL
- ORM (Object-Relational Mapping): Sequelize
- Testing Tool: Mocha
- Assertion Library: Chai
- Mocking Tool: Sinon
- Code Coverage Tool: Istanbul
- Static Code Analysis Tool: ESLint
- Code Formatting Tool: Prettier
