import axios from 'axios'

class HttpService {
    constructor(baseURL = '', timeout = 10000) {
        // Create an Axios instance with the specified base URL and timeout
        this.http = axios.create({
            baseURL,
            timeout
        })

        this.addAuthToken = this.addAuthToken.bind(this)
        this.handleError = this.handleError.bind(this)

        // Set up interceptors for requests and responses
        this.http.interceptors.request.use(this.addAuthToken)
        this.http.interceptors.response.use(
            response => response,
            this.handleError
        )
    }

    get(url, config)    { return this.http.get(url, config) }
    post(url, data, config)  { return this.http.post(url, data, config) }
    put(url, data, config)   { return this.http.put(url, data, config) }
    patch(url, data, config) { return this.http.patch(url, data, config) }
    delete(url, config) { return this.http.delete(url, config) }

    // Automatically attach the authentication token to requests
    addAuthToken(config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }

    // Error handling
    handleError(error) {
        if (error.response?.status === 401) {
            const navigateEvent = new CustomEvent('navigate', { detail: { path: '/login' } })
            window.dispatchEvent(navigateEvent);
        }
        return Promise.reject(error)
    }
}

export default HttpService
