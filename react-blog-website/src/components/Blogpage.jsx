import React, { useEffect, useState } from 'react'
import BlogCards from './BlogCards';
import Pagination from './Pagination';
import CategorSelection from './CategorSelection';
import SideBar from './SideBar';

const Blogpage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12 // blogs per page
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory,setActiveCategory] = useState(null);
    useEffect(() => {
        async function fetchBlogs() {
            let url = `http://localhost:5000/blogs?page=${currentPage}&limit=${pageSize}`;
            // filter by category
            if(selectedCategory){
                url +=`&category=${selectedCategory}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data);
        }

        fetchBlogs();
    }, [currentPage, pageSize, selectedCategory])

    // page chaging btn
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleCategorychange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category);
    }
    
  return (
    <div>
        {/* catagory section */}
        <div>
            <CategorSelection onSelectCategory={handleCategorychange} selectedCategory={selectedCategory}
            activeCategory={activeCategory}/>
        </div>

         {/* blogcards section */}
         <div className='flex flex-col lg:flex-row gap-12'>
            {/** blog card components */}
            <BlogCards blogs={blogs} currentPage={currentPage} selectedCategory={selectedCategory} pageSize={pageSize}/>
            {/** sidebar componrnts */}

            <div>
                <SideBar/>
            </div>
         </div>

          {/* pagination section */}
        <div>
            <Pagination onPageChange={handlePageChange} currentPage={currentPage} blogs={blogs} pageSize={pageSize}/>
        </div>

    </div>
  )
}

export default Blogpage