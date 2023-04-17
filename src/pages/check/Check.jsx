import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Check = ({ name, onCheckInChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
    onCheckInChange(name, event.target.checked);
  };

  return (
    <div className="check-box">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChecked}
            name={name}
            color="primary"
          />
        }
        label={name}
      />
    </div>
  );
};

export default Check;
