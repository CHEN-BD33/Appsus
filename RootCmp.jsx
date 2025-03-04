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


export function RootCmp() {
    return(
     <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />

                <Route path="/mail" element={<MailIndex />}>
                <Route path="edit/:mailId" element={<MailCompose />} />
                <Route path="edit" element={<MailCompose />} />
                <Route path="list" element={<MailList/>}/>
                <Route path=":mailId" element={<MailDetails />} /> 
    
                </Route>

               
            </Routes>

            <UserMsg />
        </section>
    </Router>
    )
}
