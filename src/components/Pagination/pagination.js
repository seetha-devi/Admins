import React ,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft , faAngleLeft , faAnglesRight , faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({currentPage, setCurrentPage , totalPages ,  selectedItems , handleDelete}) => {

  const [clickedPages, setClickedPages] = useState([]);
  const handleDeleteSelected = () => {
    selectedItems.forEach((id) => handleDelete(id));
  };

  //  const goToPage = (page) => {
  //   setCurrentPage(page);
  // };

  // const goToFirstPage = () => {
  //   setCurrentPage(1);
  // };

  // const goToPreviousPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // const goToNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  // const goToLastPage = () => {
  //   setCurrentPage(totalPages);
  // };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setClickedPages([page]);  /*(prevClickedPages) => [...prevClickedPages, page]*/
  };
  


  return (
   
    <div className='pagenavigation'>
      <div className='page-button-selector'>
      <button className='remove-selected' onClick={handleDeleteSelected}>
          Delete Selected
      </button>
      </div>

      <div className='pagination-section'>
       <button 
       className={`first-page ${clickedPages.includes(1) ? 'blue-bg' : 'grey-bg'}`}
       onClick={()=>handlePageClick(1)}
       >
           <FontAwesomeIcon icon={faAnglesLeft} />
       </button>
       <button
       className={`previous-page ${clickedPages.includes(currentPage-1) ? 'blue-bg' : 'grey-bg'}`}
       onClick={()=>handlePageClick(currentPage-1)}
       style={{ display: currentPage === 1 ? 'none' : 'block' }}
       >
           <FontAwesomeIcon icon={faAngleLeft} />
       </button>

       {Array.from({ length: totalPages }, (_, index) => (
          <button key={index}
           onClick={() => handlePageClick(index + 1)} 
           className={`current-page ${clickedPages.includes(index+1) ? 'blue-bg' : 'grey-bg'}`}>
            {index + 1}
          </button>
        ))}
          <button 
          className={`next-page ${clickedPages.includes(currentPage + 1) ? 'blue-bg' : 'grey-bg'}`}
          style={{ display: currentPage === totalPages ? 'none' : 'block' }} /* not display when no items  */
          onClick={() => handlePageClick(currentPage + 1)}
           >
        <FontAwesomeIcon icon={faAngleRight} />
         </button>

       <button 
       className={`last-page ${clickedPages.includes(totalPages) ? 'blue-bg' : 'grey-bg'}`}
        onClick={()=> handlePageClick(totalPages)}>
           <FontAwesomeIcon icon={faAnglesRight} />
       </button>
       
     </div>

       
    </div> 
  )
}

export default Pagination