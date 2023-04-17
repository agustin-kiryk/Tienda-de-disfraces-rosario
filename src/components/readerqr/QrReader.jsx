import React from 'react';

const GoogleLensButton = () => {
  const abrirGoogleLens = () => {
    window.location.href = "googlelens://"; // URL scheme o deep link de Google Lens
  };

  return (
    <div>
      <h1>Botón de Google Lens</h1>
      <button onClick={abrirGoogleLens}>Abrir Google Lens</button>
    </div>
  );
};

export default GoogleLensButton;
