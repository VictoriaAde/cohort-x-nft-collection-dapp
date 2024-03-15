import { useEffect, useState } from "react";

const useCollections = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const tokenIDs = [...Array.from({ length: 30 })].map(
                (_, index) => index
            );

            // console.log("tokenIDs", tokenIDs);

            const promises = tokenIDs.map((index) =>
                fetch(`${import.meta.env.VITE_token_base_url}${index}`)
            );

            // console.log("promises", promises);

            const tokensMetadataResponse = await Promise.all(promises);

            // console.log(" tokensMetadataResponse", tokensMetadataResponse);

            const tokensMetadataJson = [];

            for (let i = 0; i < tokensMetadataResponse.length; i++) {
                const json = await tokensMetadataResponse[i].json();
                tokensMetadataJson.push(json);
            }

            // console.log("tokensMetadataJson", tokensMetadataJson);

            setData(tokensMetadataJson);
        })();
    }, []);

    return data;
};

export default useCollections;
