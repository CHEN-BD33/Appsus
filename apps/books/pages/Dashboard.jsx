
const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {

    const [categoryStats, setCategoryStats] = useState(null)

    useEffect(() => {
        loadStats()
    }, [])

    function loadStats() {

        bookService.getCategoryStas()
            .then(setCategoryStats)
    }

    if (!categoryStats) return <div>Loading...</div>

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} Books sort by Categories</h2>
            <Chart data={categoryStats} />
        </section>
    )
}