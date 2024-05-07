import Signup from "./components/Signup";
import {Navigate, Route , Routes} from 'react-router-dom';

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup/>}></Route>
            </Routes>
        </div>
    )
}

export default App;