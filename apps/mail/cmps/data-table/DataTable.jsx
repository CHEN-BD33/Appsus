import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ mails}) {
    return <table className="data-table">
        <thead>
            <tr>
                <th>&nbsp;</th>
                <th></th>
                <th>Primary</th>
                <th>Promotions</th>
                <th>Social</th>
                <th>Updates</th>
            </tr>
        </thead>
        <tbody>
            {mails.map(mail =>
                <DataTableRow key={mail.id} mail={mail} />)}
        </tbody>
    </table>
}
