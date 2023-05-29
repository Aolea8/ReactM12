import React from 'react';
import PaginateLink from './PaginateLink';
import { useSelector } from "react-redux";

export const Paginate = () => {
    const { pages } = useSelector((state) => state.comments);
    
    return (
        <>
            <div style={{display:'flex', margin:'10px'}}>
                {pages.map((page) => (  
                      (<PaginateLink n={page} />) 
                ))} 
            </div>
        </>
    )
}
export default Paginate