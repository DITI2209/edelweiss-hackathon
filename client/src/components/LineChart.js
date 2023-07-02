import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title,CategoryScale);

function LineChart({time,prices}) {
    
  return (
    <div className="chart-container">
      <Line
        data={{
            labels: time,
            datasets: [
              {
                id: 1,
                label: '',
                data: prices,
              }
            ],
          }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Price"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;