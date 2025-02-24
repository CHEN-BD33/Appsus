const { Fragment } = React
import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ mails}) {
    return <table className="data-table">
        <tbody>
            {mails.map(mail =>
                <DataTableRow key={mail.id} mail={mail} />)}
        </tbody>
    </table>

    
}
