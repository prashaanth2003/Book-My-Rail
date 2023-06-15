import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const classes = [
  {
    value: 'FC',
    label: 'FIRST CLASS',
  },
  {
    value: 'AC',
    label: 'AC',
  },
  {
    value: 'ST',
    label: 'Sitting',
  },
  {
    value: 'SL',
    label: 'Sleeper',
  },
];

export default function SelectTextFields(props) {
  const [class_t, setclass_t] = React.useState('ST');

  const handleChange = (event) => {
    setclass_t(event.target.value);
    props.onchange(event);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={class_t}
          name="select"
          onChange={handleChange}
        >
          {classes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
