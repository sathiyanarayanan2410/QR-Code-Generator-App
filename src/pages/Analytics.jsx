import React from 'react'
import Chart from 'react-apexcharts'

function Analytics() {
  const options = {
    chart: {
      height: 280,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    markers: {
      size: 5,
      hover: {
        size: 9
      }
    }
  }

  const series = [
    {
      name: 'No of Scans',
      data: [4, 5, 8, 15, 19, 23, 25]
    }
  ]

  return (
    <div className="px-4 py-3 bg-white text-dark rounded-3">
      <h2>Analytics</h2>
      <Chart options={options} series={series} type="area" width="500" />
    </div>
  )
}

export default Analytics
