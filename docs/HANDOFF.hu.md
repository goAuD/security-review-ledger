# Security Review Ledger — folytatás VS Code-ban

A projekt célja, hogy egy új fejlesztő vagy AI-asszisztens öt perc alatt meg tudja mondani egy funkcióról, mit ellenőriztek ténylegesen, milyen bizonyíték áll rendelkezésre, és mely ismert esetek vannak még nyitva. A repó tartalmazza az ehhez szükséges szakmai döntéseket.

## Amiben megállapodtunk

- A skill angol nyelvű, a felhasználó nyelvén jelent. A nyílt Agent Skills formátumot használja. Az utasítások bármely megfelelő kliensben olvashatók, a futtatható ellenőrzések a kliens helyi jogosultságaitól és eszközeitől függenek.
- Egy vizsgálathoz egy verziózott nyilvántartás tartozik két nézettel. Az egyik a valóban elvégzett ellenőrzéseket és a hozzájuk tartozó eljárást, teszteket, eredményeket és korlátokat sorolja fel. A másik az ismert nyitott kérdéseket mutatja az eredetükkel, hatásukkal és következő vizsgálatukkal együtt.
- A fejlesztő adja meg az elvárt viselkedést. A kódból kikövetkeztetett elvárást a jelentés feltételezésként jelöli. Egy megírt vagy kihagyott teszt végrehajtása nyitott marad.
- Egy megváltozott követelmény, függőség vagy konfiguráció újraellenőrzést indokolhat. Az előző eredményt megőrizzük.
- Az első változat fájlokkal működik. A vizsgálati napló helyét a felhasználó jelöli ki. A közzétehető példa szintetikus adatokkal készült. A licenc MIT.

## Első helyi próba

1. Nyisd meg a repó gyökerét VS Code-ban. Olvasd el a [skillt](../skills/security-review-ledger/SKILL.md) és a [példa követelményét](../examples/recipe-access/requirement.md).
2. A repó gyökerében futtasd a három tesztet.

   ```sh
   node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs
   ```

3. Hasonlítsd össze a helyi eredményt a [példajelentéssel](../examples/recipe-access/review.md). Ezután egy új ágon vegyél elő egyetlen új esetet, például egy megszűnt konyhai tagságot. Döntsd el, hol és mikor kell érvényesülnie a visszavonásnak. A hiányzó követelményt rögzítsd nyitott kérdésként.

## Kezdőprompt bármelyik fejlesztői asszisztenshez

> Olvasd el a README.md fájlt, a skills/security-review-ledger/SKILL.md utasításait és az examples/recipe-access/requirement.md követelményét. Végezz új, helyi vizsgálatot a példán. A saját futásodból dolgozz. Magyarul add vissza az elvégzett ellenőrzések és az ismert nyitott kérdések két nézetét. Ha nincs terminálod, jelöld pontosan, mit néztél át a forrásban és mi maradt futtatásra. A végén vesd össze az eredményt az examples/recipe-access/review.md mintával.

## Munkakezdés GitHubból

A fejlesztési mappádban klónozd a repót, majd nyisd meg az új könyvtárat az editorban.

```sh
git clone https://github.com/goAuD/security-review-ledger.git
cd security-review-ledger
code .
```

A VS Code-ban a megnyitott mappa adja a helyi munkaterületet. Másik projektbe telepítés előtt a `npx skills add goAuD/security-review-ledger --list` paranccsal listázhatod a távoli skillt. A tényleges telepítéshez használd a README-ben szereplő parancsot. A skills.sh a CLI telepítési telemetriája alapján veszi fel a skilleket. A katalógusban való megjelenést külön érdemes ellenőrizni.

A projektet a [CLI leírása](https://github.com/vercel-labs/skills) és a [skills.sh GYIK](https://skills.sh/docs/faq) alapján lehet terjeszteni. A ChatGPT-projektben tarthatod a tervezést, a helyi fejlesztői asszisztensnek a repó dokumentumai adják a folytatáshoz szükséges kontextust.
