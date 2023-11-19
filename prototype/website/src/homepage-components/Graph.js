import { useState, React, useRef, useEffect } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbLst } from "../map-components/utilities/createData";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default function Graph({ roundedYear }) {
  const [data, setData] = useState(false);
  const chartRef = useRef(null);
  const options = useRef(null);

  /*     var labels = []
        var position = yearNbLst[0]  
        var minInterval = yearNbLst[yearNbLst.length - 1] - yearNbLst[yearNbLst.length - 2] 
        while (position <= yearNbLst[yearNbLst.length - 1]) {
            labels.push(position)
            position += minInterval
        } */
  const labels = yearNbLst;

  useEffect(() => {
    if (roundedYear) {
      const r_json = [
        [
          4501152.564736704, 5687125.043162013, 7314623.360772638,
          9651703.303763803, 13278308.720370028, 19155697.8251658,
          28859173.786186624, 44577880.9100211, 72685063.40864953,
          110530464.79305194, 232268839.59476188, 237052185.46214265,
          240762156.43342057, 227702851.26131678, 241697006.73686016,
          253395812.73907095, 271638947.198158, 278346068.29725873,
          285870180.6418725, 311142695.8334173, 323462634.466325,
          397889878.07756853, 444653998.3254159, 456248092.0456138,
          442309221.7711834, 503051110.57025933, 516147605.2967677,
          595456868.9675277, 617975871.7121305, 648184791.2188855,
          670899972.9373823, 702227784.7037405, 753279295.721348,
          788254952.1240695, 827951477.5340207, 900945173.898628,
          942261665.764287, 954892369.5829049, 1028932341.2560647,
          1065623599.8435855, 1148205430.8537347, 1209754493.4433181,
          1287033875.6102102, 1346093954.8613267, 1346763124.3655787,
          1427718966.8895354, 1548405722.5109673, 1670635634.6239395,
          1800219417.4895144, 1927857192.2966404, 2106406145.0322058,
          2328459964.8260374, 2529568053.7994075, 2571632294.2507424,
          2618653389.53431, 2665323756.4449806, 2712252556.4721236,
          2759935373.044776, 2808751198.1522098, 2858965620.7498074,
          2910741963.9158807, 2964159220.547667, 3019267069.3984003,
          3075836223.5787477, 3134330642.9327903, 3195010260.127046,
          3258175167.5813694, 3323982648.6591573, 3392530766.5516872,
          3463604853.4287868, 3536642809.784064, 3610875195.238228,
          3685696055.2902665, 3760244579.3679967, 3835145059.0695763,
          3910454200.4495983, 3986236548.2776294, 4062536250.97288,
          4136812782.007801, 4211630433.554878, 4286926412.585912,
          4362632174.62307, 4438437379.355813, 4519619550.347887,
          4601135330.924597, 4683022802.975781, 4765328318.397249,
          4848077852.855381, 4936071035.984753, 5024482661.562761,
          5113235802.285335, 5202229068.273474, 5291256828.828397,
          5375924328.582155, 5460895223.325693, 5546031666.232263,
          5631345944.930989, 5716798109.116228, 5797091859.523211,
          5876280929.36761, 5956382021.82151, 6036800095.763152,
          6117941194.412116, 6194470685.518526, 6272904654.989674,
          6351850843.27319, 6431333385.964222, 6511374989.228319,
          6590775003.19057, 6670750254.849587, 6751348502.519984,
          6832617437.218998, 6900999468.236101, 6977348841.416725,
          7052728617.964492, 7129160815.584457, 7205128742.571662,
          7281125653.964919, 7357138271.127447, 7433094904.09095,
        ],
      ];
      const newData = r_json[0].map((value, index) => {
        return {
          x: yearNbLst[index],
          y: value,
        };
      });
      console.log(newData[yearNbLst.indexOf(roundedYear)]);
      options.current = {
        scales: {
          y: {
            title: {
              display: true,
              text: "[individuals]",
            },
          },
          x: {
            title: {
              display: true,
              text: "[year]",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Global population development",
          },
          annotation: {
            annotations: {
              point1: {
                type: "point",
                xValue: yearNbLst.indexOf(roundedYear),
                yValue: newData[yearNbLst.indexOf(roundedYear)].y,
                radius: 5,
                backgroundColor: "rgba(255, 99, 132, 0.25)",
              },
            },
          },
        },
      };
      setData({
        labels: labels,
        datasets: [
          {
            label: "Population",
            data: newData,
            fill: false,
          },
        ],
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
    }
  }, [roundedYear, data]);

  return (
    <>
      {data ? (
        <div style={{}}>
          <Line
            ref={chartRef}
            data={data}
            options={{ ...options.current, maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <div>No data yet</div>
      )}
    </>
  );
}
