import Form from './components/form';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/index.js');
  worker.start();
}

const App = () => {
  return <Form />;
};

export default App;
