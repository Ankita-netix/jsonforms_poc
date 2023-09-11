import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  id?: string;
  value: string;
  updateValue: (newValue: string) => void;
}

const Camera = ({ value, updateValue }: CameraProps) => {
  const [isOn, setIsOn] = useState(false);
  const [selected, setSelected] = useState<string>('environment');
  const videoConstraints = {
    width: 540,
    facingMode: selected,
  };
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc =
      // @ts-ignore
      webcamRef && webcamRef.current && webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    if (imageSrc) {
      updateValue(imageSrc);
      const fileInfo = document.getElementById('img_input');
      // @ts-ignore
      if (fileInfo.value) document.getElementById('img_input').value = '';
      setIsOn(false);
    }
  }, [webcamRef]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    //   @ts-ignore
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const base64 = reader.result;
      console.log(base64);
      // @ts-ignore
      setUrl(base64);
      if (base64) {
        // @ts-ignore
        updateValue(base64);
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  return (
    <>
      <h4>Upload Image</h4>
      <div className='file-input'>
        <input
          type='file'
          placeholder='upload image'
          accept='image/*'
          id='img_input'
          onChange={(e) => {
            handleFile(e);
          }}
        />
        <span>
          <b>or</b>
        </span>
      </div>

      {isOn && (
        <div className='qr-container'>
          {' '}
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
          />
          <br />
          <button onClick={capturePhoto}>Capture</button>
          <select onChange={(e: any) => setSelected(e.target.value)}>
            <option value={'environment'}>Back Camera</option>
            <option value={'user'}>Front Camera</option>
          </select>
        </div>
      )}

      <br />
      <div className='qr-container'>
        <button
          onClick={() => {
            setIsOn(!isOn);
          }}
        >
          {isOn ? 'Turn off Camera' : 'Turn on Camera'}
        </button>

        {url && (
          <div>
            <img
              style={{ maxWidth: '500px', maxHeight: '500px' }}
              src={url}
              alt='Screenshot'
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Camera;
