import { MainActionButton } from '../components/MainActionButton';
import { PixelMap } from '../components/PixelMap';
import { CreatorProvider } from '../context/CreatorProvider';

export default function Create() {
  return (
    <CreatorProvider>
      <h1 className="text-4xl mt-2">Pixel World</h1>
      <PixelMap />
      <MainActionButton />
    </CreatorProvider>
  );
}
