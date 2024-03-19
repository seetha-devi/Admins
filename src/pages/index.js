import React , {useState} from 'react'
import Search from '@/components/Search/search'
import Spacer from '@/components/Spacer/spacer'
import TableData from '@/components/TableData/table'




const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  



  return (
   <div>
      <Spacer  height={'30px'}/>
      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Spacer  height={'30px'}/>
      <TableData searchTerm={searchTerm} />
   </div>
  )
}

export default Home


