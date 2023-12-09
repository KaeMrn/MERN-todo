import './App.css';
import Header from './components/Header';
import TodoListContainer from './components/TodoListContainer';
import CustomButton from './components/CustomButton';

function App() {
    return (
        <div>
            <Header></Header>
            <TodoListContainer></TodoListContainer>
        </div>
    );
}

export default App;
