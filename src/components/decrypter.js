import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./crypter.css";
import securityImage from "../image/0.jpg";

const Decrypter = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  // Function to display SweetAlert2
  const showAlert = (type, message) => {
    Swal.fire({
      icon: type,
      title: type === "error" ? "Oops..." : "Succès",
      text: message,
    });
  };

  // Function to handle decryption based on type
  const decryptMessage = (type) => {
    if (!message) {
      showAlert("error", "Veuillez entrer un message crypté !");
      return;
    }
    if (!key) {
      showAlert("error", "Veuillez entrer une clé !");
      return;
    }

    switch (type) {
      case "cesar":
        if (!/^\d+$/.test(key)) {  // Check if key is a single integer
          showAlert("error", "Pour le décryptage César, la clé doit être un seul entier !");
          return;
        }
        setDecryptedMessage(cesarDecrypt(message, parseInt(key)));
        showAlert("success", "Message décrypté avec succès !");
        break;
        
      case "affine":
        const affineKeyParts = key.split(" ");  // Expect two integers separated by space
        if (affineKeyParts.length !== 2 || !affineKeyParts.every(part => /^\d+$/.test(part))) {
          showAlert("error", "Pour le décryptage Affine, la clé doit être composée de deux entiers !");
          return;
        }
        const a = 5;  // Same value as used for encryption
        const b = parseInt(affineKeyParts[1]);
        setDecryptedMessage(affineDecrypt(message, a, b));
        showAlert("success", "Message décrypté avec succès !");
        break;
        
      case "vigenere":
        if (!/^[a-zA-Z]+$/.test(key)) {  // Check if key is a word (letters only)
          showAlert("error", "Pour le décryptage Vigenère, la clé doit être un mot !");
          return;
        }
        setDecryptedMessage(vigenereDecrypt(message, key));
        showAlert("success", "Message décrypté avec succès !");
        break;
        
      default:
        setDecryptedMessage("Type de décryptage invalide !");
    }
  };

  // Function to decrypt using Caesar cipher
  const cesarDecrypt = (text, shift) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  // Function to decrypt using Affine cipher
  const affineDecrypt = (text, a, b) => {
    const modInverse = (a, m) => {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
      }
      return -1;
    };

    const aInverse = modInverse(a, 26);
    if (aInverse === -1) {
      showAlert("error", "La clé de cryptage est invalide pour le décryptage affine.");
      return "";
    }

    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(
            ((aInverse * ((code - base - b + 26)) % 26) + base)
          );
        }
        return char;
      })
      .join("");
  };

  // Function to decrypt using Vigenère cipher
  const vigenereDecrypt = (text, key) => {
    let keyIndex = 0;
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          let shift =
            key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
          keyIndex++;
          return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  // Reset function to clear all fields and results
  const resetFields = () => {
    setMessage("");
    setKey("");
    setDecryptedMessage("");
    showAlert("success", "Les champs ont été réinitialisés !");
  };

  return (
    <div className="crypter-container">
      <div className="form-container">
        <a href="/cryptage" className="navigate-decrypter-button">
          crypter
        </a>
        {/* Bouton de navigation vers Home */}
        <a href="/" className="navigate-home-button">
          Home
        </a>
        <h1 className="crypter-title">Décryptage de Messages</h1>
        <input
          type="text"
          placeholder="Entrez votre message crypté"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-message"
        />
        <input
          type="text"
          placeholder="Entrez une clé"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input-key"
        />
        <div className="crypter-button-group">
          <button
            onClick={() => decryptMessage("cesar")}
            className="crypter-action-button cesar"
          >
            Décryptage César
          </button>
          <button
            onClick={() => decryptMessage("affine")}
            className="crypter-action-button affine"
          >
            Décryptage Affine
          </button>
          <button
            onClick={() => decryptMessage("vigenere")}
            className="crypter-action-button vigenere"
          >
            Décryptage Vigenère
          </button>
        </div>
        <br />
        <div>
          <button onClick={resetFields} className="crypter-action-button reset">
            Réinitialiser
          </button>
        </div>
        {decryptedMessage && (
          <div className="result-container">
            <h3>Message décrypté :</h3>
            <p>{decryptedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Decrypter;
