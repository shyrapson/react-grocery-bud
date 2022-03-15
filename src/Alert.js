import React,{useEffect} from 'react'

function Alert({type,msg,removeAlert,list}) {
    // useEffect is use to remove the showalert function
    useEffect(() => {
       const timeOut = setTimeout(() => {
           removeAlert()
       }, 3000);
       return () => clearTimeout(timeOut)
    }, [list])
    // any value on type is what is to attach to the css template literal
    return <p className={`alert alert-${type}`}>{msg}</p>
       
}

export default Alert
