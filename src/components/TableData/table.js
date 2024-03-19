import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen , faSave } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/pagination';


const TableData = ({searchTerm}) => {
  const [data, setData] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemperPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };
  
    if (!data) { // Check if data is null
      fetchData(); // Call fetchData only if data is null
    }
  }, [data]);


  if (loading) {
    return <div>Loading...</div>; 
  }

  const tableData = data.filter(item => {
    const searchRegex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive matching
    return (
      item.name.match(searchRegex) ||
      item.email.match(searchRegex) ||
      item.role.match(searchRegex) ||
      item.id.toString().match(searchRegex) // Convert id to string before matching
    );
  });

  // Check if no search results and search term is not empty
  const noSearchResult = tableData.length === 0 && searchTerm.trim() !== ''; 

  
  // Function to handle edit click
  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Function to handle save click
  const handleSave = (id) => {
    setEditingId(null);
    // Perform save operation, e.g., send edited data to server
  };

  // Remove the deleted item from the local state
  const handleDelete = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id)); // Remove from selected items
  };

  // Selected checkboxes are remove form there

  const handleSelectChange= (id) => {
    setSelectedItems(prevItems => {
      if (prevItems.includes(id)) {
        return prevItems.filter(item => item !== id); // Remove if already selected
      } else {
        return [...prevItems, id]; // Add if not already selected
      }
    });
  };


// find values for totalPages, StartIndex, EndIndex and currentData.
  const totalPages = Math.ceil( tableData ? tableData.length/itemperPage : 0);

  const startIndex = (currentPage - 1) * itemperPage;
  const endIndex = startIndex + itemperPage;

  const currentData = tableData ? tableData.slice(startIndex, endIndex) : [];

 //to return pagination component
  return (
    <div className='container mx-auto'>
       {noSearchResult ?
       
       (
         <div className="text-center font-bold text-2xl">No data found</div>
       ):


      <table className='table-section p-1 mx-5'>
      <thead>
          <tr>
            <th className='px-4 text-center py-2'  size="1.5x">Id</th>
            <th className='px-4 w-1/4 text-center'>Name</th>
            <th className='px-4 w-2/5 text-center'>Email</th>
            <th className='px-4 w-1/5 text-center'>Role</th>
            <th className='px-1 w-2/5 text-center'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentData && currentData.map((item) => (
            <tr key={item.id}  
            className={`py-2 ${selectedItems.includes(item.id) ? 'selected-row' : ''}`}
          >
              <td className='text-center py-2'>
                <input type='checkbox' 
                 className='table-check' 
                 checked={selectedItems.includes(item.id)}
                 onChange={()=>{handleSelectChange(item.id)}}
                 />  
              </td>
              <td className='text-center'>
              {editingId === item.id ? (
                <input type='text'
                 value={item.name} 
                 className='text-center'
                  />) :(
                    item.name
                  )}
              </td>
              <td className='text-center'>
                {editingId === item.id ? (
                  <input
                  type="text" 
                  value={item.email} 
                  className='text-center w-3/4'
                  onChange={(e) => setData(prevData => prevData.map(row => row.id === item.id ? { ...row, email: e.target.value } : row))} />
                ) : (
                  item.email
                )}
              </td>
              <td className='px-4 text-center'>
                {editingId === item.id ? (
                  <input type="text" 
                   value={item.role}
                   className='text-center'
                   onChange={(e) => setData(prevData => prevData.map(row => row.id === item.id ? { ...row, role: e.target.value } : row))} />
                ) : (
                  item.role
                )}
              </td>
              <td className='text-center'>
                {editingId === item.id ? (
                  <FontAwesomeIcon
                   icon={faSave} 
                   style={{ color: '#067418', cursor: 'pointer' }} 
                   onClick={() => handleSave(item.id)} 
                   />
                ) : (
                  <FontAwesomeIcon 
                  icon={faPen} 
                  style={{ color: '#067418', cursor: 'pointer' }} 
                  onClick={() => handleEdit(item.id)} 
                  />
                )}
                <span className='pl-5'>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ color: '#f50a0a', cursor: 'pointer' }}
                    onClick={() => handleDelete(item.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
                
        </tbody>
      </table>
      
     
  };

      {/* passed the references for pagination component */}
      {!noSearchResult && 
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        selectedItems={selectedItems}
        handleDelete={handleDelete}
      />}
    </div>
  );
};

export default TableData;
