import React, { useState } from "react";
import Swal from "sweetalert2"; // Importation de SweetAlert2
import "./crypter.css";
import securityImage from "../image/5.avif";

const Crypter = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  // Function to display SweetAlert2
    const showAlert = (type, message) => {
      Swal.fire({
        icon: type,
        title: type === "error" ? "Oops..." : "Succès",
        text: message,
      });
    };
  

  // Fonction pour crypter un message
  const encryptMessage = (type) => {
    if (!message) {
      showAlert("error","Veuillez entrer un message !");
      return ;
    }
    if (!key) {
      showAlert("error","Veuillez entrer une clé !");
      return ;
    }

    switch (type) {
      case "cesar":
        // Check if key is a single integer
        if (!/^\d+$/.test(key)) {
          showAlert("error","La clé pour le cryptage César doit être  un entier.");
          return;
        }
        setEncryptedMessage(cesarEncrypt(message, parseInt(key)));
        showAlert("success", "Message crypté avec succès !");
        break;
      case "affine":
        // Check if key is two integers separated by a space
        if (!/^\d+\s\d+$/.test(key)) {
          showAlert("error","La clé pour le cryptage Affine doit contenir deux entiers separer par un espace.");
          return;
        }
        const [a, b] = key.split(" ").map(Number);
        setEncryptedMessage(affineEncrypt(message, a, b));
        showAlert("success", "Message crypté avec succès !");

        break;
      case "vigenere":
        // Check if key is a word (letters only)
        if (!/^[a-zA-Z]+$/.test(key)) {
          showAlert("error","La clé pour le cryptage Vigenère doit être un mot (lettres uniquement).");
          return;
        }
        setEncryptedMessage(vigenereEncrypt(message, key));
        showAlert("success", "Message crypté avec succès !");
        break;
      default:
        showAlert("Type de cryptage invalide !");
    }
  };

  // Fonction pour réinitialiser les champs
  const resetFields = () => {
    setMessage("");
    setKey("");
    setEncryptedMessage("");
  };

  // Fonction de cryptage César
  const cesarEncrypt = (text, shift) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  // Fonction de cryptage Affine
  const affineEncrypt = (text, a, b) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((a * (code - base) + b) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  // Fonction de cryptage Vigenère
  const vigenereEncrypt = (text, key) => {
    let keyIndex = 0;
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code >= 65 && code <= 90 ? 65 : 97;
          let shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
          keyIndex++;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  return (
    <div className="crypter-container">
      
      <div className="form-container">
        {/* Bouton de navigation vers Décrypter */}
        <a href="/decrypter" className="navigate-decrypter-button">
          Décrypter
        </a>
        {/* Bouton de navigation vers Home */}
        <a href="/" className="navigate-home-button">
          Home
        </a>
        <h1 className="crypter-title">Cryptage de Messages</h1>
        <input
          type="text"
          placeholder="Entrez votre message clair"
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
            onClick={() => encryptMessage("cesar")}
            className="crypter-action-button cesar"
          >
            Cryptage César
          </button>
          <button
            onClick={() => encryptMessage("affine")}
            className="crypter-action-button affine"
          >
            Cryptage Affine
          </button>
          <button
            onClick={() => encryptMessage("vigenere")}
            className="crypter-action-button vigenere"
          >
            Cryptage Vigenère
          </button>
        </div>
        <br />
        <div>
          <button onClick={resetFields} className="crypter-action-button reset">
            Réinitialiser
          </button>
        </div>
        {encryptedMessage && (
          <div className="result-container">
            <h3>Message crypté :</h3>
            <p>{encryptedMessage}</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Crypter;
