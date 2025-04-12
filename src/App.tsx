import { useState } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';
import { OnConfigChange, DefaultConfig } from './interfaces/configs';

function App() {
  const [defaultConfig, setDefaultConfig] = useState<DefaultConfig>({
          PomodoroTime: 1500,
          shortRestTime: 300, 
          longRestTime: 900,
          cycles: 4
  });
  const handleConfigChange = (newConfig: OnConfigChange) => {
        // Spread operator (Sem mexer diretamente no estado original)
        setDefaultConfig((prevConfig) => ({
            ...prevConfig,
            ...newConfig,
          }));
  };
  return (
    <div className="container">
     <PomodoroTimer 
        config={defaultConfig}
        onConfigChange={handleConfigChange}
        />
    </div>
  );
}

export default App;
