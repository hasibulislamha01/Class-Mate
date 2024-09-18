import useGetLatestData from "./useGetLatestData";

const useGetDocumentCounts = (api) => {

    const data = useGetLatestData(api, api)
    console.log(data, api);
    return data
};

export default useGetDocumentCounts;