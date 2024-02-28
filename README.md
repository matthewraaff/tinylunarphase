# tinyLunarPhase
A _very_ minimal Javascript library for working out the current lunar phase.

## Examples
To get started, you can either directly import lunar.js to your HTML file or use a package manager like Deno or npm.

```js
// Depends on what package manager you're using. This example is for regular js.
const { getMoonPhase } = require('./lunar.js');

// Create a date object, or use Date() to represent the current time.
const date = new Date('2024-02-28');

// Find the current moon phase
const moonPhase = getMoonPhase(date);

// You will recieve an object like this
{text: 'Waning Gibbous', emoji: '🌖'}
```

You can find a better example in [the examples folder](demos/index.html)

## Contributions
I accept contributions. This project is quite minimal, and I would like to keep it that way for now, but bug-fixes, documentation and smaller new features are great.

## License
BSD 3-Clause - Check [LICENSE](LICENSE) for more details.