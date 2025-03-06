const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { MailList } from './apps/mail/cmps/MailList.jsx'
import { BookIndex } from './apps/books/pages/BookIndex.jsx'
import { BookDetails } from './apps/books/pages/BookDetails.jsx'
import { BookEdit } from './apps/books/pages/BookEdit.jsx'
import { BookAdd } from './apps/books/pages/BookAdd.jsx'
const { useState, useEffect } = React

export function RootCmp() {
    const [filterBy, setFilterBy] = useState({ txt: '', isRead: '' });

    return (
        <Router>
            <section className="root-cmp">
                <AppHeader onSetFilter={setFilterBy} filterBy={filterBy}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/note" element={<NoteIndex/>} />

                    <Route path="/mail" element={<MailIndex filterBy={filterBy} setSearchParams={setFilterBy} />}>
                        <Route path="edit/:mailId" element={<MailCompose />} />
                        <Route path="edit" element={<MailCompose />} />
                        <Route path="list" element={<MailList />} />
                        <Route path=":mailId" element={<MailDetails />} />
                    </Route>

                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/add" element={<BookAdd />} />
                </Routes>
                <UserMsg />
            </section>
        </Router >
    )
}
