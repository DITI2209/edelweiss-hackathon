import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function LineChart({ data }) {
  const strikePrices = data.map(obj => obj['Strike Price']);
  const impliedVolatilities = data.map(obj => obj['Implied Volatility']);

  return (
    <div className="chart-container">
      <Line
        data={{
          labels: impliedVolatilities,
          datasets: [
            {
              id: 1,
              label: '',
              data: strikePrices,
              borderColor: 'blue', // Set line color to blue
              backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Price',
              color: 'white', // Set title text color to white
              font: {
                size: 16,
                weight: 'bold',
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white', // Set x-axis ticks color to white
              },
              grid: {
                color: 'white', // Set x-axis grid lines color to white
              },
            },
            y: {
              ticks: {
                color: 'white', // Set y-axis ticks color to white
              },
              grid: {
                color: 'white', // Set y-axis grid lines color to white
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
