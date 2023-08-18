import { useSelector } from 'react-redux';
import './ExploreContainer.css'
import { RootState } from '../state';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const {currentLocation} = useSelector((state:RootState) => state.app)

  return (
    <div id="container">
      <strong>{currentLocation?.lat + ' ' + currentLocation?.lng}</strong>
    </div>
  );
};

export default ExploreContainer;
