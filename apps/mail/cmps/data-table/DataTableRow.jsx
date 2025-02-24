import { LongTxt } from "../../../../cmps/LongTxt.jsx"

const { useState, Fragment } = React

export function DataTableRow({mail}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Fragment>
            <tr>
                <td className="toggle-expand" onClick={() => {
                    setIsExpanded(prevIsExpanded => !prevIsExpanded)
                }}>
                    {(isExpanded) ? '-' : '+'}
                </td>
                <td>{mail.fullName}</td>
                <td>{mail.subject}</td>
                <td> <LongTxt txt={mail.body}/></td>

            </tr>
            <tr hidden={!isExpanded}>
                <td colSpan="5" className="mail-info">
                    <h1>{mail.subject}</h1>
                    <h5>{mail.fullName} </h5>
                    <h5>{mail.from}</h5>
                    <p> {mail.body} </p>  

                </td>
            </tr>
        </Fragment>
    )
}
