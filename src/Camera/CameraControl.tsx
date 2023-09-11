import { withJsonFormsControlProps } from '@jsonforms/react';
import Camera from './Camera';

interface CameraControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const CameraControl = ({ data, handleChange, path }: CameraControlProps) => {
  return (
    <Camera
      value={data}
      updateValue={(newValue: any) => handleChange(path, newValue)}
    />
  );
};

// allows a custom rendered component
// utility function from JSON Forms that will give us all necessary props to render the control
export default withJsonFormsControlProps(CameraControl);
