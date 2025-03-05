import '../Styles/DateComp.css'

const DateComp = () => {
    const date: Date = new Date()
    let today = date.getDate()
    return(
        <div className = "flex-container ">
            <h1 className = "date">{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</h1>
        </div>
    )
}

export default DateComp