import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import moment from 'moment/moment'

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
  }));
  
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }));
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white,
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }));

export default function BasicTable(props) {
    const { data, filename } = props;

    const exportToExcel = (data) => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
      
        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data.map((item)=> {
            return {
                id: item.id,
                name: item.name,
                status: item.status,
                Joined_Date:  moment(item.joinedDate)
                .utcOffset('+8:00')
                .format('YYYY-MM-DD hh:mm:ss a')

            }
        }));
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        // Generate the Excel file
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      };

  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Joined Date</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>IP Address</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{moment(item.joinedDate).utcOffset('+8:00').format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                <TableCell>{item.location[0] === null ? 'UNDEFINED' : item.location[0] + ', ' + item.location[1]}</TableCell>
                <TableCell>{item.IPAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <StyledButton sx={{ mt: 3 }} onClick={() => exportToExcel(data)}>Export to Excel</StyledButton>
    </>
  );
}