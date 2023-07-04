import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Modal from 'react-modal';
import './chartmodal.css'
Modal.setAppElement('#root');

function ChartModal({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const strikePrices = data.map(obj => obj['Strike Price']);
  const impliedVolatilities = data.map(obj => Number(obj['Implied Volatility']).toFixed(2));

  const chartData = {
    labels: impliedVolatilities,
    datasets: [
      {
        label: '',
        data: strikePrices,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0.5,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Strike Price vs Implied Volatility',
        color: 'white',
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
          color: 'white',
        },
        grid: {
            display:false,
          color: 'rgba(128, 128, 128, 0.5)',
        },
        title: {
            display: true,
            text: 'Implied Volatility',
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
       
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
            display:false,
          color: 'rgba(128, 128, 128, 0.5)',
        },
        scaleLabel: {
            display: true,
            labelString: 'Strike Price',
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
      },
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'black',
      color: 'white',
      padding: '1%',
      maxWidth: '1100px',
      maxHeight: '80%',
      margin: 'auto',
    },
  };

  const chartStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <div className='chart'>
      <div className='button'>
      <div class="frame">
        <button onClick={openModal} >View Chart</button>
      </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        
        <div className="modal-content">
          <h2>Chart Modal</h2>
          <div style={chartStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        
        </div>
      </Modal>
      
    </div>
  );
}

export default ChartModal;
