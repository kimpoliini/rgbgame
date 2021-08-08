import "./options.css"

const Options = ({dismiss}) => {

function click(e){
    if(e.currentTarget === e.target){
        dismiss()
    }
}
    return (
        <div className="options-background" onClick={(e) => click(e)}>
            <div className="options-content">
                <h3>Options</h3>
            </div>
        </div>
    )
}

export default Options