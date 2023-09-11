import { useState } from 'react';

import { QrReader } from 'react-qr-reader';

interface QrProps {
  id?: string;
  value: string;
  updateValue: (newValue: string) => void;
}

function ViewFinder() {
  const viewFinderStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    border: '2px solid #fff',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    zIndex: '999',
  };
  // @ts-ignore
  return <div style={viewFinderStyle}></div>;
}

const QrCode = ({ value, updateValue }: QrProps) => {
  const [selected, setSelected] = useState<string>('environment');
  const [startScan, setStartScan] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  return (
    <div id='#/properties/qr_code'>
      <h3>
        Last Scan:
        {selected}
      </h3>
      <div className='qr-container'>
        <button
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? 'Stop Scan' : 'Start Scan'}
        </button>
        {startScan && (
          <>
            <select onChange={(e: any) => setSelected(e.target.value)}>
              <option value={'environment'}>Back Camera</option>
              <option value={'user'}>Front Camera</option>
            </select>
            <QrReader
              constraints={{ facingMode: selected }}
              onResult={(result: any, error: any) => {
                if (!!result) {
                  const qrText = result?.getText();
                  setData(qrText);
                  setStartScan(false);
                  updateValue(qrText);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
              className='qr-code'
              ViewFinder={ViewFinder}
            />
          </>
        )}
        {data !== '' && <p>{data}</p>}
      </div>
    </div>
  );
};

export default QrCode;
