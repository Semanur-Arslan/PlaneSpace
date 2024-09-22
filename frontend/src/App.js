import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/index';
import HomePage from './pages/HomePage/index';
import MyFlightsPage from './pages/MyFlightsPage/index';

function App() {
  // Menü durumunu yönetmek için state tanımladım.
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    // Redux store'unu uygulamaya bağlamak için Provider bileşenini kullandım. Redux'a kaydettiğim verilere uygulamanın her noktasından erişebilmek için.
    <Provider store={store}>
      <div className="relative bg-secondary px-4 md:px-0">
        <div className=" h-full container mx-auto">
          {/* Yönlendirmeler için react-router-dom yapısını kullandım. */}
          <BrowserRouter>
            {/* Header bileşenini render ettim ve menü durumunu props olarak geçtim. */}
            <Header onMenuToggle={setMenuOpen} isMenuOpen={isMenuOpen} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/my-flights" element={<MyFlightsPage />} />
            </Routes>
          </BrowserRouter>
          {/* Mobile menü açıkken arkaplan fon rengini ayarladım */}
          <div className={`fixed inset-0 bg-darkGray ${isMenuOpen ? 'bg-opacity-50' : 'opacity-0 pointer-events-none'}`}></div>
        </div>
      </div>
    </Provider>
  );
}

export default App;

