import React from 'react'
import QRCode from 'react-qr-code'
import axios from 'axios'

import { PenLine, Trash2 } from 'lucide-react'
import MyVerticallyCenteredModal from '../components/Model'
import { Button } from 'react-bootstrap'

const baseurl = window.location.origin
const MyQrcode = () => {
  const [data, setData] = React.useState([])
  const [modalShow, setModalShow] = React.useState(false)

  React.useEffect(() => {
    axios
      .get('/api/user/qrcodes')
      .then((res) => setData(res.data))
      .catch((error) => console.error(error.message))
  }, [])

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
            <th scope="col">NanoId</th>
            <th scope="col">fullurl</th>
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
                  value={baseurl + '/' + item.short_url}
                  size={32}
                  level="L"
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox={`0 0 32 32`}
                />
              </td>
              <td>{item.short_url}</td>
              <td>{item.full_url}</td>
              <td className="text-end ">
                <Button
                  size="sm"
                  variant="outline-dark"
                  className="border-0 me-1"
                  onClick={() => setModalShow(true)}
                >
                  <PenLine size={18} strokeWidth={1.75} />
                </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />

                <button className="border-0 btn btn-outline-danger btn-sm">
                  <Trash2 size={18} strokeWidth={1.75} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyQrcode
