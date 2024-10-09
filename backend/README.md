# URL Shortener

## Description

This is a simple URL shortener API built with NestJS. It uses a map to store the shortened URLs and their corresponding original URLs. It also provides a list of the top 100 shortened URLs.                             

## Features

- Shorten URLs
- Redirect to original URLs
- Get top 100 shortened URLs

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Run the application using `npm run start`

## Usage

### Shorten URL

To shorten a URL, send a POST request to the `/url/shorten` endpoint with the URL in the request body. The response will contain the shortened URL.

```json
{
  "shortUrl": "http://localhost:5000/url/a"
}
```

### Redirect to Original URL

To redirect to the original URL, send a GET request to the `/url/:shortCode` endpoint with the short code in the URL. The response will contain the original URL.

```json
{
  "url": "https://www.google.com"
}
```

### Get Top 100 Shortened URLs

To get the top 100 shortened URLs, send a GET request to the `/url/top-100/list` endpoint. The response will contain an array of objects with the following properties:

- `shortCode`: The short code of the URL.
- `originalUrl`: The original URL.
- `title`: The title of the URL.
- `accessCount`: The number of times the URL has been accessed.

```json
[
  {
    "shortCode": "a",
    "originalUrl": "https://www.google.com",
    "title": "Google",
    "accessCount": 1
  },
  {
    "shortCode": "b",
    "originalUrl": "https://www.youtube.com",
    "title": "YouTube",
    "accessCount": 2
  },
  {
    "shortCode": "c",
    "originalUrl": "https://www.facebook.com",
    "title": "Facebook",
    "accessCount": 3
  },
  ...
]
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.
