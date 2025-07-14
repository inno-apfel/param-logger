## API Routes

### Users

#### Create a new user
```sh
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"username": "myuser", "password": "mypassword"}'
```

#### Get a user by ID
```sh
curl http://localhost:8080/users/<userId>
```

#### Get all users
```sh
curl http://localhost:8080/users
```

---

### Tanks

#### Create a new tank
```sh
curl -X POST http://localhost:8080/tanks \
  -H "Content-Type: application/json" \
  -d '{"tank_name": "Tank 1", "owner_id": "user-id"}'
```

#### Get a tank by ID
```sh
curl http://localhost:8080/tanks/<tankId>
```

#### Get all parameters for a tank
```sh
curl http://localhost:8080/tanks/<tankId>/parameters
```

#### Create a new parameter for a tank
```sh
curl -X POST http://localhost:8080/tanks/<tankId>/parameters \
  -H "Content-Type: application/json" \
  -d '{"param_name": "pH", "reference_value": 8.2, "unit_of_measure": "pH", "tank_id": "<tankId>"}'
```

#### Get all observations for a tank (grouped by parameter)
```sh
curl http://localhost:8080/tanks/<tankId>/observations
```

#### Create a new observation for a tank
```sh
curl -X POST http://localhost:8080/tanks/<tankId>/observations \
  -H "Content-Type: application/json" \
  -d '{"value": 8.1, "param_id": "<parameterId>"}'
```