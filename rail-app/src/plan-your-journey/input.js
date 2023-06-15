import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const types = {
    from: NearMeIcon,
    to: LocationOnIcon
};

export default function InputWithIcon(props) {
    const Icon = types[props.label];
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end',justifyContent: 'center' }}>
        <Icon />
        <TextField id={props.id} label={props.label} variant="standard" name={props.label} onChange={props.onchange}/>
      </Box>
    </Box>
  );
}
