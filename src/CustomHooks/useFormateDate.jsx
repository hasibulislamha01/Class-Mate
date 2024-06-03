import { format } from "date-fns";

const useFormateDate = ( date ) => {

    console.log(date)
    // Split the date string based on the double hyphen separator
    const [month, day, year] = date.split('/');

    // Create a valid date string for the Date constructor
    const validDateString = `${year}-${month}-${day}`;

    // Parse the date
    const parsedDate = new Date(validDateString);
    console.log(parsedDate)
    if (isNaN(parsedDate)) {
        throw new RangeError('Invalid time value');
    }

    const formatedDate = format(parsedDate, 'dd MMMM, yyyy')
    return formatedDate
};

export default useFormateDate;