# @tq-em/em-http-service

HTTP service with Axios for handling requests on the em platform with auth and error management.

## Installation

First, configure your `.yarnrc.yml` to use the TQ-EM registry for scoped packages:

```yaml
npmScopes:
  tq-em:
    npmRegistryServer: "<tq-em-registry-url>"
```

Then install the package:

```bash
yarn add @tq-em/em-http-service
```

## Features

- 🔒 **Automatic Authentication** - Automatically attaches Bearer tokens from localStorage to requests
- ⚠️ **Error Handling** - Built-in error handling with automatic redirect on 401 (Unauthorized)
- ⚡ **Axios-based** - Full Axios API support with request/response interceptors
- 🎯 **Configurable** - Customize base URL and timeout for your needs

## Usage

### Basic Setup

```javascript
import HttpService from '@tq-em/em-http-service'

// Create an instance with your API base URL
const api = new HttpService('https://api.example.com', 10000)

// Make requests
const response = await api.get('/users')
const user = await api.post('/users', { name: 'John' })
```

### Configuration

```javascript
const api = new HttpService(baseURL, timeout)
```

**Parameters:**
- `baseURL` (string, optional): Base URL for all requests. Default: `''`
- `timeout` (number, optional): Request timeout in milliseconds. Default: `10000` (10 seconds)

### Available Methods

```javascript
// GET request
api.get(url, config)

// POST request
api.post(url, data, config)

// PUT request
api.put(url, data, config)

// PATCH request
api.patch(url, data, config)

// DELETE request
api.delete(url, config)
```

All methods return Axios promises and support the full Axios config object.

## Authentication

The service automatically reads authentication tokens from `localStorage` with key `'token'` and attaches them as Bearer tokens to all requests.

> **Note:** Token management is handled by the main UI container component.

## Error Handling

The service includes built-in error handling:

- **401 Unauthorized**: Automatically dispatches a custom `navigate` event to redirect to `/login`
- Other errors are rejected and can be handled with standard promise `.catch()` or try/catch

```javascript
try {
    const data = await api.get('/protected-resource')
} catch (error) {
    console.error('Request failed:', error)
}
```

> **Note:** Authentication token management and navigation handling are provided by the main UI container component.

## License

LicenseRef-TQSPSLA-1.0.3 - See [LICENSE](LICENSE) file for details.

## Author

TQ-Systems GmbH

© TQ-Systems GmbH 2026
