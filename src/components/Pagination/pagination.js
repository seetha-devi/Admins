import React ,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft , faAngleLeft , faAnglesRight , faGreaterThan } from '@fortawesome/free-solid-svg-icons'

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
    setClickedPages((prevClickedPages) => [...prevClickedPages, page]);
  };
  


  return (
      
   
    <div className='pagenavigation'>

      <button className='remove-selected' onClick={handleDeleteSelected}>
          Delete Selected
      </button>

      <div className='pagination-section'>
       <button 
       className={`first-page ${clickedPages.includes(1) ? 'grey-bg' : 'blue-bg'}`}
       onClick={()=>handlePageClick(1)}
       >
           <FontAwesomeIcon icon={faAnglesLeft} />
       </button>
       <button
       className={`previous-page ${clickedPages.includes(currentPage-1) ? 'grey-bg' : 'blue-bg'}`}
       onClick={()=>handlePageClick(currentPage-1)}
       >
           <FontAwesomeIcon icon={faAngleLeft} />
       </button>

       {Array.from({ length: totalPages }, (_, index) => (
          <button key={index}
           onClick={() => handlePageClick(index + 1)} 
           className={`current-page ${clickedPages.includes(index+1) ? 'grey-bg' : 'blue-bg'}`}>
            {index + 1}
          </button>
        ))}
       <button 
       className={`next-page ${clickedPages.includes(currentPage+1) ? 'grey-bg' : 'blue-bg'}`}
       onClick={()=> handlePageClick(currentPage + 1)}>
           <FontAwesomeIcon icon={faGreaterThan} />
       </button>
       <button 
       className={`last-page ${clickedPages.includes(totalPages) ? 'grey-bg' : 'blue-bg'}`}
        onClick={()=> handlePageClick(totalPages)}>
           <FontAwesomeIcon icon={faAnglesRight}  />
       </button>
       
     </div>

       
    </div> 
  )
}

export default Pagination