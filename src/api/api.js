class Api {
  static get baseURL () {
    return 'http://localhost:8080/api'
  }

  static get timeout () {
    return 60 * 1000
  }

  static async fetch (url, init) {
    const controller = new AbortController()
    init.signal = controller.signal
    const timer = setTimeout(() => {
      controller.abort()
    }, Api.timeout)
    try {
      const response = await fetch(url, init)
      const text = await response.text()
      const json = text ? JSON.parse(text) : {}
      if (json.error) {
        return json.error
      }
      return json.result
    } catch (error) {
      if (error.name === 'AbortError') {
        // eslint-disable-next-line no-throw-literal
        throw {
          code: 98,
          description: [
            error.message.toLowerCase()
          ]
        }
      }
      throw error
    } finally {
      clearTimeout(timer)
    }
  }

  static async get (url) {
    return await Api.fetch(url, {})
  }

  static async post (url, data) {
    return await Api.fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }

  static async put (url, data) {
    return await Api.fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }

  static async delete (url) {
    return await Api.fetch(url, {
      method: 'DELETE'
    })
  }
}

export { Api }
