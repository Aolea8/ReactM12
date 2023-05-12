import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    
    return (<>
    
            <>
                {data?.results.length === 0 ? (
                    <></>
                ) : (
                    <Carousel
                    title="Recomendaciones"
                    data={data?.results}
                    endpoint={mediaType}
                    />
                )}
            </>
        </>
        
    );
};

export default Recommendation;