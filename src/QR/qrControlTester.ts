import { rankWith, scopeEndsWith } from '@jsonforms/core';
export default rankWith(
  4, //increase rank as needed
  scopeEndsWith('qr_code')
);
