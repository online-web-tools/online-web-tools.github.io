const MyDiv = ({ value, onChange, children }) => {
    return (
        <div 
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: value}}
            onInput={onChange}
            onBlur={onChange}>
            {children}
        </div>
    );
}

export default MyDiv;