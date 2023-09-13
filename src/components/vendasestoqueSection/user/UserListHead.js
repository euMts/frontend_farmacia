import PropTypes from 'prop-types';
// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserListHead({
  headLabel,
}) {

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignDirection} style={{ fontWeight: "bold" }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
