# VZW Beeldverhalen

Video- en animatieprojecten voor de VZW, met als eerste project de diabetesanimatie voor de stand in Hasselt.

**Presentatie:** https://fredje4711.github.io/vzw-beeldverhalen/

## Huidige presentatie
Twee video's: 1 op 12 en 1 op 10. Beide hebben een eigen afspeelmogelijkheid, volledig-schermknop en downloadknop. De pagina bevat een korte persoonlijke toelichting voor de bestuursbespreking.

De goedgekeurde MP4's zijn Full HD, 60 beelden per seconde en ongeveer 58 seconden lang. Gebruik de presentatie bij voorkeur op een laptop.

## Bestanden
- `dist/index.html`: presentatiepagina
- `dist/style.css`: eenvoudige opmaak
- `dist/app.js`: afspelen, volledig scherm en downloaden
- `dist/media`: twee MP4's, voorbeeldbeelden en lokale downloadondersteuning
- `voorbeeldmail.txt`: voorstel voor een begeleidende mail

Open `dist/index.html` om de presentatie lokaal te bekijken. Bewaar de mapstructuur. Bij ondersteunde browsers laat Download MP4 een opslagmap kiezen en verschijnt na het wegschrijven een bevestiging. Andere browsers gebruiken hun eigen downloadoverzicht. De offline-databestanden ondersteunen downloads bij openen vanaf de lokale schijf; online worden de MP4's rechtstreeks opgehaald.

## Publiceren en uitbreiden
GitHub Actions publiceert de inhoud van `dist` naar GitHub Pages bij wijzigingen op `main`. Nieuwe video- of animatieprojecten kunnen later binnen deze repository worden toegevoegd.

De website en bestanden zijn openbaar bereikbaar. Er worden geen analytics, cookies of externe lettertypen gebruikt.

## Toegevoegd: elke 17 minuten
Beide varianten bevatten na het openingscijfer een extra moment met de tekst en Vlaamse voice-over: “Elke 17 minuten krijgt iemand in Vlaanderen de diagnose diabetes.” De regio Vlaanderen is bewust vermeld. Dit is het door Diabetes Liga gebruikte communicatiecijfer; de bron is het [Strategisch Beleidsplan 2023–2025](https://www.diabetes.be/sites/default/files/2023-01/Strategische%20Beleidsplan%20DL%202023-2025.pdf). Het is geen afzonderlijk geverifieerde nieuwe meting voor 2026.
