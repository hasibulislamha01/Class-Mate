
const useTodaysDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const date = `${month}/${day}/${year}`
    console.log(date)
    return date
};

export default useTodaysDate;