import React from 'react'
import QRCode from 'react-qr-code'
import axios from 'axios'

import { PenLine, Trash2, LineChart } from 'lucide-react'
import MyVerticallyCenteredModal from '../components/Model'
import { Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const baseurl = window.location.origin
const MyQrcode = () => {
  const [data, setData] = React.useState([])
  const [modalShow, setModalShow] = React.useState(false)
  const [urlData, setUrlData] = React.useState({})
  const navigator = useNavigate()

  React.useEffect(() => {
    axios
      .get('/api/user/qrcodes')
      .then((res) => setData(res.data))
      .catch((error) => console.error(error.message))
  }, [])

  function handleDelete(url) {
    if (confirm('Do you want to delete?')) {
      axios
        .delete('/api/shorturl/' + url.short_url)
        .then((res) => {
          toast.success(res.data.message)
          setData(data.filter((item) => item.short_url !== url.short_url))
        })
        .catch((error) => toast.error(error.response.data.message))
    }
  }

  function handleUpdate(url) {
    axios
      .put('/api/shorturl/' + urlData.short_url, { url })
      .then((res) => {
        toast.success('URL updated successfully')
        const index = data.findIndex(
          (item) => item.short_url === urlData.short_url
        )
        data[index] = res.data
        setData([...data])
        setModalShow(false)
      })
      .catch((error) => console.error(error.response.data.message))
  }

  return (
    <div>
      <h1 className="mb-4">My Qrcodes</h1>

      <table
        className="table"
        style={{
          minWidth: 720
        }}
      >
        <thead>
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">Qrcode</th>
            <th scope="col">fullurl</th>
            <th scope="col">visits</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row" className="text-center">
                {index + 1}
              </th>
              <td>
                <QRCode
                  value={baseurl + '/r/' + item.short_url}
                  size={32}
                  level="L"
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox={`0 0 32 32`}
                />
              </td>
              <td>{item.full_url}</td>
              <td>{item.no_of_scans}</td>
              <td className="text-end">
                <Button
                  size="sm"
                  variant="outline-dark"
                  className="border-0 me-1"
                  onClick={() => {
                    // setUrlData(item)
                    // setModalShow(true)
                  }}
                >
                  <LineChart size={18} strokeWidth={1.75} />
                </Button>
                <Button
                  size="sm"
                  variant="outline-dark"
                  className="border-0 me-1"
                  onClick={() => {
                    setUrlData(item)
                    setModalShow(true)
                  }}
                >
                  <PenLine size={18} strokeWidth={1.75} />
                </Button>

                <button
                  className="border-0 btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 size={18} strokeWidth={1.75} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MyVerticallyCenteredModal
        show={modalShow}
        handleUpdate={handleUpdate}
        onHide={() => setModalShow(false)}
        setUrl={(url) => setUrlData({ ...urlData, full_url: url })}
        {...urlData}
      />
    </div>
  )
}

export default MyQrcode
