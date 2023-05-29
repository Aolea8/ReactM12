import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from './commentSlice';

export const PaginateLink = ({ n }) => {
    const dispatch = useDispatch();

    return (
        <div>
            {n.active ? (
                <>
                    <a href="#!">
                        {/* Per eliminar els &quote */}
                        <div className='paglinks linkactive' dangerouslySetInnerHTML={{ __html: n.label }} />
                    </a>
                </>
            ) : (
                <>
                    {/* Artifici per a obtenir el número de pàgina de la url */}
                    <a onClick={(e) => { if (n.url != null) dispatch(setPage(n.url.split("=")[1])) }} href="#!">
                        <div className='paglinks' dangerouslySetInnerHTML={{ __html: n.label }} />
                    </a>
                </>
            )}
        </div>
    )
}
export default PaginateLink