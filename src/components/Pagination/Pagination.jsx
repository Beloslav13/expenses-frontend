import Pagination from 'react-bootstrap/Pagination';
import './Pagination.css'

function CustomPagination(props) {
  return (
    <Pagination>
      <Pagination.Prev onClick={props.handlePrevPage} disabled={props.prevDisabled} />
      <Pagination.Next onClick={props.handleNextPage} disabled={props.nextDisabled}/>
    </Pagination>
  );
}

export default CustomPagination;