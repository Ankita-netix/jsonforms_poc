import { withJsonFormsControlProps } from '@jsonforms/react';
import QrCode from './QrCode';

interface QrCodeProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const QrControl = ({ data, handleChange, path }: QrCodeProps) => {
  return (
    <QrCode
      value={data}
      updateValue={(newValue: any) => handleChange(path, newValue)}
    />
  );
};

// allows a custom rendered component
// utility function from JSON Forms that will give us all necessary props to render the control
export default withJsonFormsControlProps(QrControl);
