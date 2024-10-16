import Pagination from 'react-bootstrap/Pagination';
import './Pagination.css'

function CustomPagination(props) {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Next />
    </Pagination>
  );
}

export default CustomPagination;