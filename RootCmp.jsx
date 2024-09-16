import { Home } from './cmps/Home.jsx'

export function App() {
    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books App</h1>
            </header>
            <main class="container">
                <Home />
            </main>
        </section>
    )
}