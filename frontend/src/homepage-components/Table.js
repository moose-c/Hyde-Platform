import React from 'react'

export default function Table() {
  return (
    <div>
                <table>
            <thead>
              <tr style={{ backgroundColor: "#f7941d", color: "#fff" }}>
                <th>Continent</th>
                <th>Population (millions)</th>
                <th>Crop Yield (tons)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Africa</td>
                <td>1,215</td>
                <td>35,000,000</td>
              </tr>
              <tr>
                <td>Asia</td>
                <td>4,560</td>
                <td>120,000,000</td>
              </tr>
              <tr>
                <td>Europe</td>
                <td>742</td>
                <td>25,000,000</td>
              </tr>
              <tr>
                <td>North America</td>
                <td>579</td>
                <td>18,000,000</td>
              </tr>
              <tr>
                <td>Oceania</td>
                <td>42</td>
                <td>1,500,000</td>
              </tr>
              <tr>
                <td>South America</td>
                <td>430</td>
                <td>12,000,000</td>
              </tr>
            </tbody>
          </table>
    </div>
  )
}
