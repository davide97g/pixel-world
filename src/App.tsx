import './App.css';
import { MainActionButton } from './components/MainActionButton';
import { PixelMap } from './components/PixelMap';
import { CreatorProvider } from './context/CreatorProvider';

const App = () => {
  return (
    <CreatorProvider>
      <div className="content">
        <h1 className="text-4xl mt-2">Pixel World</h1>
        <PixelMap />
        <MainActionButton />
      </div>
    </CreatorProvider>
  );
};

export default App;
