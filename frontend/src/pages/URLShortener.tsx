import React, { memo, useEffect, useState } from 'react'

interface UrlData {
  shortCode: string
  originalUrl: string
  title: string
  accessCount: number
}

interface Props {}

const baseURL = 'http://localhost:5000/url'

const URLShortener: React.FC<Props> = memo(() => {
  const [url, setUrl] = useState('')
  const [top100URL, setTop100URL] = useState<UrlData[]>([])
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const submitUrl = async () => {
    try {
      const response = await fetch(`${baseURL}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await response.json()
      setShortUrl(data.shortUrl)
      setError('')
      getTop100()
    } catch (err) {
      setError('Failed to shorten URL. Please try again.')
      setShortUrl('')
    }
  }

  const getTop100 = async () => {
    try {
      const response = await fetch(`${baseURL}/top-100/list`)
      if (!response.ok) {
        throw new Error('Failed to fetch top URLs')
      }

      const data: UrlData[] = await response.json()
      setTop100URL(data)
    } catch (err) {
      setError('Failed to load top URLs.')
    }
  }

  useEffect(() => {
    getTop100()
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6 w-screen">
      <h1 className="text-4xl font-bold my-4 text-black">URL Shortener</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-64 my-4 rounded border border-gray-300 px-4 py-2 text-black"
        placeholder="Enter your URL here"
      />
      <button
        onClick={submitUrl}
        className="my-4 w-52 rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
      >
        Submit URL
      </button>

      {shortUrl && (
        <div className="mt-4 p-2 bg-green-100 border border-green-500 text-green-700">
          Shortened URL:{' '}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-500 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 text-black">
        <h1 className="text-2xl font-bold">Top 100 URLs</h1>
        <ul className="list-disc list-inside">
          {top100URL.map((urlData) => (
            <li key={urlData.shortCode} className="mt-2">
              <a
                href={`http://localhost:5000/url/${urlData.shortCode}`}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {urlData.shortCode}
              </a>{' '}
              - {urlData.originalUrl} (Visits: {urlData.accessCount})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

URLShortener.displayName = 'URLShortener'

export default URLShortener
