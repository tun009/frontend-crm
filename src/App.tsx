import '@/assets/styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          CRM Frontend
        </h1>
        <p className="text-gray-600 mb-8">
          Phase 1 Setup Complete! 🚀
        </p>
        <div className="space-x-4">
          <button className="btn-primary">
            Primary Button
          </button>
          <button className="btn-secondary">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
