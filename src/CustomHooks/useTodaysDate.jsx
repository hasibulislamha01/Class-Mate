import dayjs from "dayjs";

const useTodaysDate = () => {
    
    const today = dayjs();
    const formattedDate = today.format('MM-DD-YYYY')

    return formattedDate;
};

export default useTodaysDate;
