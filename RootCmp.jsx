const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookDetails } from "./pages/CarDetails.jsx"
import { BookEdit } from "./pages/CarEdit.jsx"
import { BookIndex } from "./pages/CarIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function App() {

    const [page, setPage] = useState('book')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>

                    <main className="main-layout">
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </main>
                </Routes>
                <UserMsg />

            </section>
        </Router>
    )
}