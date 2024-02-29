import React from 'react'
import axios from 'axios'
import QRCode from 'react-qr-code'

const Generator = () => {
  const [url, setUrl] = React.useState('')
  const [shortUrl, setShortUrl] = React.useState('')
  const qrcodeRef = React.useRef(null)

  const generateShortUrl = `${location.origin}/r/${shortUrl}`

  function downloadQRCodeAsSvg() {
    const svg = qrcodeRef.current.parentElement.innerHTML

    // download the QRCode as SVG
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    console.log(url)

    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
  }

  function downloadQRCodeAsPng() {
    const svg = qrcodeRef.current
    const canvas = document.createElement('canvas')
    canvas.width = 256 + 20
    canvas.height = 256 + 20
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const svgData = new XMLSerializer().serializeToString(svg)

    img.onload = function () {
      ctx.drawImage(img, 10, 10)
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        console.log(url)

        const a = document.createElement('a')
        a.href = url
        a.download = 'qrcode.png'
        a.click()
      })
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  function onSubmitHandler(e) {
    e.preventDefault()

    axios
      .post('/api/generate', { url })
      .then((res) => {
        setShortUrl(res.data.short_url)
      })
      .catch((error) => console.error(error.message))
  }

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="w-100 container"
        style={{ maxWidth: 600 }}
      >
        <div className="col-12">
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {shortUrl && (
        <div>
          <code>
            <a href={generateShortUrl} target="_blank">
              {generateShortUrl}
            </a>
          </code>

          <div className="mt-4">
            <div
              className="bg-white p-3 rounded-3 mx-auto"
              style={{ maxWidth: 256 }}
            >
              <a href={generateShortUrl} target="_blank">
                <QRCode
                  ref={qrcodeRef}
                  size={256}
                  level="L"
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={generateShortUrl}
                  viewBox={`0 0 256 256`}
                />
              </a>
              <div className="d-flex gap-2 mt-2">
                <button
                  onClick={downloadQRCodeAsSvg}
                  className="btn btn-primary w-50"
                >
                  SVG
                </button>
                <button
                  onClick={downloadQRCodeAsPng}
                  className="btn btn-outline-primary w-50"
                >
                  PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Generator
