import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../../../utils/api/index";

import AddCardScreenBreadcrumbNavBar from "./AddCardScreenBreadcrumbNavBar";
import CardForm from "../CardForm";
import AddCardDoneButton from "./AddCardDoneButton";

function AddCardScreen() {
  const [deck, setDeck] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const deckId = useParams().deckId;

  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  // Handling changes to the front and back  of the card from the form
  const handleCardFrontChange = (event) => setCardFront(event.target.value);
  const handleCardBackChange = (event) => setCardBack(event.target.value);

  // When the user clicks on the "Save" button, the new card will be created using createCard()
  const handleAddCardSave = (event) => {
    event.preventDefault();
    createCard(deckId, { front: cardFront, back: cardBack });
    setCardFront("");
    setCardBack("");
  };

  if (deck.name) {
    return (
      <div>
        <AddCardScreenBreadcrumbNavBar deckName={deck.name} deckId={deckId} />
        <h2>{deck.name}: Add Card</h2>
        <form onSubmit={handleAddCardSave}>
          <CardForm
            cardFront={cardFront}
            handleCardFrontChange={handleCardFrontChange}
            cardBack={cardBack}
            handleCardBackChange={handleCardBackChange}
          />
          <AddCardDoneButton deckId={deckId} />
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </div>
    );
  }
  return "Loading...";
}

export default AddCardScreen;