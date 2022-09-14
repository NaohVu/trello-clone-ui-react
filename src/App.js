import NavbarApp from './layouts/components/NavbarApp/NavbarApp';
import NavbarBoard from './layouts/components/NavbarBoard/NavbarBoard';
import BoardColumns from './layouts/components/BoardColumns/BoardColumns';

function App() {
    return (
        <div className="App">
            <NavbarApp />
            <NavbarBoard />
            <BoardColumns />
        </div>
    );
}

export default App;
