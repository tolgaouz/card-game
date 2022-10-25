## Frontend challenge

Use React, TypeScript, and Tailwind.

Feel free to use any additional libraries, **except for out-of-the-box deck/card dealing.**

Please write tests.

The task is to build a simple card game. The designs are in Figma, you can see [desktop](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=0%3A1) and [mobile](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352) pages. The fonts should be available in Google Fonts, but we also included them in assets if they ever take them down (has happened before). It doesn't have to be pixel perfect, but it should look nice.

**Requirements**

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. Press a "Deal" button to deal 5 random cards.
3. Pressing the button again should deal 5 unique, random cards. Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
4. Add a card counter which shows how many cards are left.
5. Add an ace counter which shows how many aces are left. (this is not present in the designs at the time of this writing, you can do it the way it makes most sense to you, consistent with the designs)
6. Add a button to reset the game.
7. When all the aces have been dealt, "Game Over" should be displayed.
8. If there is an ace in the last draw and there are no more cards left to deal, display "Winner", otherwise display "You Lose. Better luck next time!" Last draw means the last draw that is allowed, as there could be additional cards left to deal, but no aces.

**Bonus!**

1. Animations. Wow us!
2. Sounds
3. Deploy to the web for us to play
