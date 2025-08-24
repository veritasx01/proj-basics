
export function AppHeader({page = 'home', onSetPage}) {

    function onPageChange(ev, page) {
        ev.preventDefault()
        onSetPage(page)
    }    

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Starter Proj</h1>
                <nav>
                    <a href="" className={(page === 'home') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'home')}>
                        Home
                    </a> |
                    <a href="" className={(page === 'about') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'about')}>
                        About
                    </a>
                </nav>
            </section>
        </header>
    )
}
