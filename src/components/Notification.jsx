import "./notification.css"


const Notification = ({important = false, text}) => {


    return (
        <div className={important ? "notification important" : "notification simple"}>
            <p>{text}</p>
        </div>
    )
}

export default Notification