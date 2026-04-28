# Exp6 - JPA & Hibernate with MySQL/PostgreSQL

This practical implements all required tasks:

1. Database connectivity configured using Spring profiles (`h2`, `mysql`, `postgres`) in `application*.properties`.
2. JPA entities and repositories created.
3. Relationships implemented:
   - **Many-to-Many:** `AppUser` ↔ `Role`
   - **One-to-Many / Many-to-One:** `Category` → `Product`
4. Custom queries with filtering, sorting, and pagination:
   - JPQL: products by price range, users by role
   - Criteria API: dynamic product search by price range
5. SQL analysis enabled through Hibernate SQL + bind parameter logging.

## Project structure highlights

- `src/main/java/com/example/exp6/model` → Entities (`AppUser`, `Role`, `Category`, `Product`)
- `src/main/java/com/example/exp6/repository` → JPA repositories and JPQL queries
- `src/main/java/com/example/exp6/service/ProductQueryService.java` → Criteria API query
- `src/main/java/com/example/exp6/controller/DemoController.java` → REST endpoints for execution
- `src/main/resources/application*.properties` → DB/profile config + SQL logging

## Run the project

Default profile is `h2` (no external DB required).

```bash
cd "/Users/amitrajeet/Downloads/Academic Notes/FSD/Exp6"
mvn spring-boot:run
```

Use MySQL:

```bash
cd "/Users/amitrajeet/Downloads/Academic Notes/FSD/Exp6"
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

Use PostgreSQL:

```bash
cd "/Users/amitrajeet/Downloads/Academic Notes/FSD/Exp6"
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

## API endpoints to demonstrate requirements

- `GET /api/categories/{id}/products`  
  Fetch related products from a category (relationship fetch).

- `GET /api/users/by-role?role=ADMIN&page=0&size=5`  
  JPQL query for users by role with pagination.

- `GET /api/products/jpql?min=500&max=3000&page=0&size=5&sortBy=price&direction=asc`  
  JPQL query for price filtering + sorting + pagination.

- `GET /api/products/criteria?min=500&max=5000&page=0&size=5&sortBy=price&direction=desc`  
  Criteria API query with dynamic filters + sorting + pagination.

## Analyze generated SQL

SQL output is printed in console because of:

- `spring.jpa.show-sql=true`
- `logging.level.org.hibernate.SQL=DEBUG`
- `logging.level.org.hibernate.orm.jdbc.bind=TRACE`

This will show generated SQL and bind values for JPQL + Criteria API execution.

## Run tests

```bash
cd "/Users/amitrajeet/Downloads/Academic Notes/FSD/Exp6"
mvn test
```
