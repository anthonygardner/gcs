import { useIMU } from './imu/useIMU';
import { IMUDataDisplay } from './imu/IMUData';
import { IMUViewer } from './imu/IMUViewer';

const WS_URL = import.meta.env.VITE_WS_URL;

function App() {
  const { data, connected } = useIMU(WS_URL);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <IMUViewer data={data} />
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
        <IMUDataDisplay data={data} connected={connected} />
      </div>
    </div>
  );
}

export default App;